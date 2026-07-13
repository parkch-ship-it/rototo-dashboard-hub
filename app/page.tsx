'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Status = 'live' | 'pending';

type Category =
  | '상품관리'
  | '매출'
  | '퍼포먼스마케팅'
  | '경영전략'
  | '관리'
  | '상품기획'
  | '브랜드마케팅'
  | '생산, 원가관리'
  | 'CX관리'
  | '관리자';

type Dashboard = {
  name: string;
  desc: string;
  owner: string;
  team: string;
  category: Category;
  url?: string;
  status: Status;
  embedBlocked?: boolean;
};

const CATEGORIES: { key: Category; icon: string }[] = [
  { key: '상품관리', icon: '▦' },
  { key: '매출', icon: '$' },
  { key: '퍼포먼스마케팅', icon: '⚡' },
  { key: '경영전략', icon: '◆' },
  { key: '관리', icon: '◷' },
  { key: '상품기획', icon: '%' },
  { key: '브랜드마케팅', icon: '◉' },
  { key: '생산, 원가관리', icon: '⚙' },
  { key: 'CX관리', icon: '↺' },
  { key: '관리자', icon: '⚿' },
];

const DASHBOARDS: Dashboard[] = [
  // 상품관리
  { name: '상세페이지 제작 웹앱', desc: '상품관리 마스터 웹페이지', owner: '렛서', team: '전사', category: '상품관리', url: 'https://rototobebe-master.vercel.app/', status: 'live', embedBlocked: true },
  // 매출
  { name: 'FP&A 대시보드', desc: 'FP&A 대시보드 웹페이지', owner: '렛서', team: '전사', category: '매출', url: 'https://rototobebe-fpna.vercel.app/', status: 'live', embedBlocked: true },
  { name: '판매처 데이터 자동 업로드', desc: '판매처별 데이터 자동 업로드 도구 웹페이지', owner: '렛서', team: '전사', category: '매출', url: 'https://rototobebe-data-loader.vercel.app/', status: 'live', embedBlocked: true },
  { name: '상품 판매분석', desc: '상품별 일일 판매 현황', owner: '배상현', team: '대표이사', category: '매출', url: 'https://sales-dashboard-topaz-seven.vercel.app/product-daily', status: 'pending' },
  // 퍼포먼스마케팅
  { name: '마케팅 소재 생성', desc: '퍼포먼스 마케팅 소재 생성 웹페이지', owner: '렛서', team: '전사', category: '퍼포먼스마케팅', url: 'https://rototobebe-ad-studio.vercel.app/', status: 'live', embedBlocked: true },
  { name: '마케팅 대시보드', desc: '퍼포먼스 마케팅 대시보드 웹페이지', owner: '렛서', team: '전사', category: '퍼포먼스마케팅', url: 'https://rototobebe-performance-ui.vercel.app/', status: 'live', embedBlocked: true },
  { name: '마켓 센싱', desc: '마켓 센싱 웹페이지', owner: '렛서', team: '전사', category: '퍼포먼스마케팅', url: 'https://rototobebe-market-sensing.vercel.app/', status: 'live', embedBlocked: true },
  { name: '로토토베베 사이즈 추천폼', desc: 'ROTOTOBEBE 사이즈 추천 도구', owner: '김선애', team: '영업마케팅팀', category: '퍼포먼스마케팅', url: 'https://rototobebe-size.vercel.app', status: 'live' },
  { name: '로덬메이트 운영 자동화', desc: '로덬메이트 운영 자동화 (예정)', owner: '김선애', team: '영업마케팅팀', category: '퍼포먼스마케팅', status: 'pending' },
  // 경영전략
  { name: '경영 전략 종합', desc: '경영 전략 종합 인사이트', owner: '배상현', team: '대표이사', category: '경영전략', url: 'https://kidsintel-dashboard.vercel.app/', status: 'pending' },
  // 관리
  { name: '예산관리', desc: '예산 집행 및 관리', owner: '이종민', team: '경영지원본부', category: '관리', url: 'https://ax-dashboard-opal.vercel.app/budget', status: 'live' },
  // 상품기획
  { name: '할인율 분석', desc: '판매처/상품별 할인율 분석', owner: '김지선', team: '상품기획팀', category: '상품기획', url: 'https://rototo-dashboard.vercel.app/dashboard', status: 'live' },
  { name: 'ASSORT 분석', desc: '상품 속성별 사이즈 DATA 분석', owner: '김지선', team: '상품기획팀', category: '상품기획', url: 'https://rototo-dash-v2.vercel.app/assort', status: 'live' },
  { name: '디자인실 일정 관리', desc: '시즌 MDP 관리 및 스케쥴 공유', owner: '김보경', team: '디자인팀', category: '상품기획', url: 'https://design-dashboard-eosin.vercel.app/dashboard', status: 'live' },
  // 브랜드마케팅
  { name: '인스타그램 운영 지표', desc: '인스타 채널 일별 지표 (메타 비즈니스 데이터)', owner: '김선애', team: '영업마케팅팀', category: '브랜드마케팅', url: 'https://rototobebe-mkt.vercel.app', status: 'live' },
  { name: '로덬메이트 여름 운영 현황', desc: '로덬메이트 멤버 적립금 현황', owner: '김선애', team: '영업마케팅팀', category: '브랜드마케팅', url: 'https://roduk-deploy.vercel.app', status: 'live' },
  { name: '네이버 쇼핑 키워드 분석(월간/주간)', desc: '네이버 쇼핑 키워드 분석', owner: '김선애', team: '영업마케팅팀', category: '브랜드마케팅', url: 'https://insight-deploy.vercel.app', status: 'live' },
  // 생산, 원가관리
  { name: '의류 생산 공정 현황', desc: '생산 단계별 진행 상황', owner: '박철', team: '생산품질팀', category: '생산, 원가관리', url: 'https://production-dashboard-next.vercel.app/', status: 'live' },
  { name: '원가현황 분석', desc: '시즌별, 카테고리별 원가율 분석', owner: '박철', team: '생산품질팀', category: '생산, 원가관리', url: 'https://rototobebe-cost-dashboard.vercel.app/?year=2025', status: 'live' },
  // CX관리
  { name: '교환/반품 취소율 데이터', desc: '교환·반품·취소 데이터 분석', owner: '이상희', team: 'CX팀', category: 'CX관리', url: 'https://y-dusky-seven-89.vercel.app/', status: 'live' },
  { name: '시즌별 불량 현황', desc: '시즌별 불량 상품 취합 및 비교', owner: '강민선', team: 'CX팀', category: 'CX관리', url: 'https://quality-dashboard-five.vercel.app', status: 'live' },
  // 관리자 (최하단)
  { name: '권한 관리', desc: '웹페이지 별 접근권한 관리 웹페이지', owner: '렛서', team: '전사', category: '관리자', url: 'https://rototobebe-admin.vercel.app/', status: 'live', embedBlocked: true },
];

type Selection = { type: 'home' } | { type: 'category'; category: Category } | { type: 'dashboard'; name: string };

export default function HomePage() {
  const [selection, setSelection] = useState<Selection>({ type: 'home' });
  const [collapsed, setCollapsed] = useState<Set<Category>>(new Set());
  const [query, setQuery] = useState('');

  const toggleCategory = (cat: Category) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const filtered = useMemo(() => {
    if (!query.trim()) return DASHBOARDS;
    const q = query.toLowerCase();
    return DASHBOARDS.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.desc.toLowerCase().includes(q) ||
        d.owner.toLowerCase().includes(q) ||
        d.team.toLowerCase().includes(q),
    );
  }, [query]);

  const selectedDash = selection.type === 'dashboard' ? DASHBOARDS.find((d) => d.name === selection.name) : null;
  const selectedCat = selection.type === 'category' ? selection.category : selectedDash?.category ?? null;

  return (
    <div className="erp">
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className="erp-sidebar">
        <div className="erp-brand">
          <span className="erp-brand-bar" />
          <div>
            <div className="erp-brand-name">ROTOTO BEBE</div>
            <div className="erp-brand-sub">대시보드 허브</div>
          </div>
        </div>

        <div className="erp-search">
          <span className="erp-search-icon">⌕</span>
          <input
            type="text"
            placeholder="메뉴 · 대시보드 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <nav className="erp-nav">
          <button
            className={`erp-nav-home ${selection.type === 'home' ? 'active' : ''}`}
            onClick={() => setSelection({ type: 'home' })}
          >
            <span className="erp-nav-icon">⌂</span>
            <span>홈</span>
          </button>

          <div className="erp-nav-label">기능별 메뉴</div>

          {CATEGORIES.map((cat) => {
            const items = filtered.filter((d) => d.category === cat.key);
            if (query && items.length === 0) return null;
            const isCollapsed = collapsed.has(cat.key) && !query;
            const isActiveCat = selection.type === 'category' && selection.category === cat.key;

            return (
              <div key={cat.key} className="erp-nav-group">
                <button
                  className={`erp-nav-cat ${isActiveCat ? 'active' : ''}`}
                  onClick={() => {
                    setSelection({ type: 'category', category: cat.key });
                    if (collapsed.has(cat.key)) toggleCategory(cat.key);
                  }}
                >
                  <span className="erp-nav-chevron" onClick={(e) => { e.stopPropagation(); toggleCategory(cat.key); }}>
                    {isCollapsed ? '▸' : '▾'}
                  </span>
                  <span className="erp-nav-icon">{cat.icon}</span>
                  <span className="erp-nav-cat-name">{cat.key}</span>
                  <span className="erp-nav-count">{items.length}</span>
                </button>
                {!isCollapsed && (
                  <div className="erp-nav-items">
                    {items.map((d) => {
                      const isActive = selection.type === 'dashboard' && selection.name === d.name;
                      const isLive = d.status === 'live';
                      return (
                        <button
                          key={d.name}
                          className={`erp-nav-item ${isActive ? 'active' : ''}`}
                          onClick={() => setSelection({ type: 'dashboard', name: d.name })}
                          title={d.embedBlocked ? '임베드 차단 · 새 탭에서 열림' : d.name}
                        >
                          <span className="erp-nav-item-dot" />
                          <span className="erp-nav-item-name">{d.name}</span>
                          {d.embedBlocked && <span className="erp-nav-item-ext" title="임베드 차단">↗</span>}
                          <span className={`erp-badge-mini ${isLive ? 'ok' : 'pending'}`}>
                            {isLive ? '완료' : '개발중'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="erp-sidebar-footer">
          <span className="erp-avatar">철</span>
          <div>
            <div className="erp-user">ROTOTO BEBE</div>
            <div className="erp-user-sub">2026.05 기준</div>
          </div>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────── */}
      <div className="erp-main">
        <div className="erp-topbar">
          <div className="erp-breadcrumb">
            <span onClick={() => setSelection({ type: 'home' })} className="erp-crumb-link">홈</span>
            {selectedCat && (
              <>
                <span className="erp-crumb-sep">›</span>
                <span
                  onClick={() => setSelection({ type: 'category', category: selectedCat })}
                  className="erp-crumb-link"
                >
                  {selectedCat}
                </span>
              </>
            )}
            {selectedDash && (
              <>
                <span className="erp-crumb-sep">›</span>
                <span className="erp-crumb-current">{selectedDash.name}</span>
              </>
            )}
          </div>
          <div className="erp-topbar-actions">
            <span className="erp-status-dot" /> 서비스 정상
          </div>
        </div>

        <div className="erp-content">
          {selection.type === 'home' && <HomeView />}
          {selection.type === 'category' && (
            <CategoryView
              category={selection.category}
              onSelect={(name) => setSelection({ type: 'dashboard', name })}
            />
          )}
          {selection.type === 'dashboard' && selectedDash && <DashboardView dash={selectedDash} />}
        </div>
      </div>
    </div>
  );
}

function HomeView() {
  const total = DASHBOARDS.length;
  const live = DASHBOARDS.filter((d) => d.status === 'live').length;
  const pending = total - live;

  return (
    <>
      <div className="erp-page-head">
        <h1 className="erp-page-title">대시보드 허브</h1>
        <p className="erp-page-sub">기능별 메뉴에서 대시보드를 선택하세요.</p>
      </div>

      <div className="erp-kpi-row">
        <div className="erp-kpi">
          <div className="erp-kpi-label">전체 대시보드</div>
          <div className="erp-kpi-value">{total}<span>개</span></div>
        </div>
        <div className="erp-kpi">
          <div className="erp-kpi-label">완료</div>
          <div className="erp-kpi-value">{live}<span>개</span></div>
        </div>
        <div className="erp-kpi">
          <div className="erp-kpi-label">개발 중</div>
          <div className="erp-kpi-value">{pending}<span>개</span></div>
        </div>
        <div className="erp-kpi">
          <div className="erp-kpi-label">기능 그룹</div>
          <div className="erp-kpi-value">{CATEGORIES.length}<span>개</span></div>
        </div>
      </div>

      <div className="erp-panel">
        <div className="erp-panel-head">
          <h2 className="erp-panel-title">기능별 개요</h2>
        </div>
        <div className="erp-cat-grid">
          {CATEGORIES.map((cat) => {
            const count = DASHBOARDS.filter((d) => d.category === cat.key).length;
            if (count === 0) return null;
            return (
              <div key={cat.key} className="erp-cat-card">
                <div className="erp-cat-icon">{cat.icon}</div>
                <div className="erp-cat-name">{cat.key}</div>
                <div className="erp-cat-count">{count}개</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

function CategoryView({ category, onSelect }: { category: Category; onSelect: (name: string) => void }) {
  const list = DASHBOARDS.filter((d) => d.category === category);
  return (
    <>
      <div className="erp-page-head">
        <h1 className="erp-page-title">{category}</h1>
        <p className="erp-page-sub">{list.length}개 대시보드</p>
      </div>

      <div className="erp-table-wrap">
        <table className="erp-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>#</th>
              <th>대시보드명</th>
              <th style={{ width: 100 }}>담당자</th>
              <th style={{ width: 140 }}>소속</th>
              <th style={{ width: 100 }}>상태</th>
              <th style={{ width: 80 }}></th>
            </tr>
          </thead>
          <tbody>
            {list.map((d, i) => (
              <tr key={d.name} onClick={() => onSelect(d.name)}>
                <td className="erp-td-mute">{i + 1}</td>
                <td>
                  <div className="erp-td-name">{d.name}</div>
                  <div className="erp-td-desc">{d.desc}</div>
                </td>
                <td>{d.owner}</td>
                <td>{d.team}</td>
                <td>
                  <span className={`erp-pill ${d.status === 'live' ? 'ok' : 'pending'}`}>
                    {d.status === 'live' ? '● 완료' : '● 개발중'}
                  </span>
                </td>
                <td className="erp-td-action">›</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function DashboardView({ dash }: { dash: Dashboard }) {
  const hasUrl = !!dash.url;
  const isLive = dash.status === 'live';
  const knownBlocked = !!dash.embedBlocked;
  const [showInfo, setShowInfo] = useState(false);
  const [iframeError, setIframeError] = useState(knownBlocked);
  const [loading, setLoading] = useState(hasUrl && !knownBlocked);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    setIframeError(knownBlocked);
    setLoading(hasUrl && !knownBlocked);
    if (knownBlocked || !hasUrl) return;
    const timer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(timer);
  }, [dash.url, knownBlocked, hasUrl]);

  if (!hasUrl) {
    return (
      <>
        <div className="erp-page-head">
          <div className="erp-page-title-row">
            <h1 className="erp-page-title">{dash.name}</h1>
            <span className="erp-pill pending">● 개발중</span>
          </div>
          <p className="erp-page-sub">{dash.desc}</p>
        </div>
        <div className="erp-panel">
          <div className="erp-panel-head">
            <h2 className="erp-panel-title">기본 정보</h2>
          </div>
          <div className="erp-field-grid">
            <div className="erp-field"><span>기능 분류</span><b>{dash.category}</b></div>
            <div className="erp-field"><span>담당자</span><b>{dash.owner}</b></div>
            <div className="erp-field"><span>소속</span><b>{dash.team}</b></div>
            <div className="erp-field"><span>URL</span><b className="erp-url">—</b></div>
          </div>
          <div className="erp-actions">
            <button className="erp-btn disabled" disabled>개발 중 (링크 준비 예정)</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="erp-embed-wrap">
      <div className="erp-embed-head">
        <div className="erp-embed-title-row">
          <div>
            <div className="erp-embed-title">
              {dash.name}
              <span className={`erp-pill ${isLive ? 'ok' : 'pending'}`} style={{ marginLeft: 10, verticalAlign: 'middle' }}>
                {isLive ? '● 완료' : '● 개발중'}
              </span>
            </div>
            <div className="erp-embed-sub">{dash.desc} · {dash.team} · {dash.owner}</div>
          </div>
          <div className="erp-embed-actions">
            <button className="erp-btn ghost" onClick={() => setShowInfo(!showInfo)}>
              {showInfo ? '정보 숨기기' : '정보 보기'}
            </button>
            <a href={dash.url} target="_blank" rel="noopener noreferrer" className="erp-btn primary">
              새 탭 열기 ↗
            </a>
          </div>
        </div>
        {showInfo && (
          <div className="erp-embed-info">
            <div className="erp-field"><span>기능 분류</span><b>{dash.category}</b></div>
            <div className="erp-field"><span>URL</span><b className="erp-url">{dash.url}</b></div>
          </div>
        )}
      </div>

      <div className="erp-iframe-wrap">
        {loading && (
          <div className="erp-iframe-loading">
            <div className="erp-spinner" />
            <div>대시보드 로딩 중…</div>
          </div>
        )}
        {iframeError ? (
          <div className="erp-iframe-fallback">
            <div className="erp-fallback-icon">↗</div>
            <div className="erp-fallback-title">이 대시보드는 새 탭에서만 열 수 있어요</div>
            <div className="erp-fallback-desc">
              보안 설정(X-Frame-Options)으로 인해 페이지 안에 직접 표시할 수 없습니다.<br />
              아래 버튼을 눌러 새 탭에서 확인해 주세요.
            </div>
            <a href={dash.url} target="_blank" rel="noopener noreferrer" className="erp-btn primary large">
              {dash.name} 열기 ↗
            </a>
            <div className="erp-fallback-url">{dash.url}</div>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={dash.url}
            className="erp-iframe"
            title={dash.name}
            onLoad={() => setLoading(false)}
            onError={() => { setIframeError(true); setLoading(false); }}
          />
        )}
      </div>
    </div>
  );
}
