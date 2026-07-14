'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type Status = 'live' | 'pending';
type Developer = '렛서' | '사내';

type Category =
  | '경영/전략'
  | '상품'
  | '생산/품질'
  | '마케팅'
  | '영업'
  | 'CX'
  | '관리자';

type Dashboard = {
  name: string;
  desc: string;
  owner: string;
  developer: Developer;
  category: Category;
  url?: string;
  status: Status;
  embedBlocked?: boolean;
};

const CATEGORIES: { key: Category; num: string }[] = [
  { key: '경영/전략', num: '1' },
  { key: '상품', num: '2' },
  { key: '생산/품질', num: '3' },
  { key: '마케팅', num: '4' },
  { key: '영업', num: '5' },
  { key: 'CX', num: '6' },
  { key: '관리자', num: '7' },
];

const DASHBOARDS: Dashboard[] = [
  // 1. 경영/전략
  {
    name: '1-1. 마켓 센싱',
    desc: '마켓 센싱 웹페이지',
    owner: '김선애',
    developer: '렛서',
    category: '경영/전략',
    url: 'https://rototobebe-market-sensing.vercel.app/dashboard',
    status: 'live',
    embedBlocked: true,
  },
  {
    name: '1-2. 판매 대시보드(FP&A)',
    desc: 'DB적재완료 후 사용',
    owner: '신규담당자 (입사 전까지 조현진)',
    developer: '렛서',
    category: '경영/전략',
    url: 'https://rototobebe-fpna.vercel.app/',
    status: 'pending',
    embedBlocked: true,
  },
  {
    name: '1-3. 부서별 예산관리',
    desc: '내용확인필요',
    owner: '이종민',
    developer: '사내',
    category: '경영/전략',
    url: 'https://ax-dashboard-opal.vercel.app/budget',
    status: 'pending',
  },
  // 2. 상품
  {
    name: '2-1. SIZE별 판매 현황',
    desc: '상품 속성별 사이즈 판매 분석',
    owner: '김지선',
    developer: '사내',
    category: '상품',
    url: 'https://rototo-dash-v2.vercel.app/assort',
    status: 'live',
  },
  {
    name: '2-2. 디자인실 MDP',
    desc: '시즌 MDP 관리 및 스케쥴 공유',
    owner: '김보경',
    developer: '사내',
    category: '상품',
    url: 'https://design-dashboard-eosin.vercel.app/dashboard',
    status: 'live',
  },
  // 3. 생산/품질
  {
    name: '3-1. 시즌별 생산 진행 현황',
    desc: '생산 단계별 진행 상황',
    owner: '박철',
    developer: '사내',
    category: '생산/품질',
    url: 'https://production-dashboard-next.vercel.app/',
    status: 'live',
  },
  {
    name: '3-2. 원가현황',
    desc: '시즌별·카테고리별 원가율 분석',
    owner: '박철',
    developer: '사내',
    category: '생산/품질',
    url: 'https://rototobebe-cost-dashboard.vercel.app/?year=2025',
    status: 'live',
  },
  // 4. 마케팅
  {
    name: '4-1. 퍼포먼스 마케팅 실적',
    desc: '데이터 일부검증 필요',
    owner: '이나영',
    developer: '렛서',
    category: '마케팅',
    url: 'https://rototobebe-performance-ui.vercel.app/',
    status: 'pending',
    embedBlocked: true,
  },
  {
    name: '4-2. 퍼포먼스 마케팅 소재생성',
    desc: '사용중',
    owner: '이나영',
    developer: '렛서',
    category: '마케팅',
    url: 'https://rototobebe-ad-studio.vercel.app/',
    status: 'live',
    embedBlocked: true,
  },
  {
    name: '4-3. 브랜드마케팅 운영',
    desc: '인스타·네이버·로덬메이트 통합 허브',
    owner: '김선애',
    developer: '사내',
    category: '마케팅',
    url: 'https://rtt-hub.vercel.app/',
    status: 'live',
  },
  // 5. 영업
  {
    name: '5-1. 상품 판매분석',
    desc: 'DB적재완료 후 사용',
    owner: '배상현',
    developer: '사내',
    category: '영업',
    url: 'https://sales-dashboard-topaz-seven.vercel.app/product-daily',
    status: 'pending',
  },
  {
    name: '5-2. 상품등록',
    desc: '가을부터 사용',
    owner: '김효은',
    developer: '렛서',
    category: '영업',
    url: 'https://rototobebe-master.vercel.app/master',
    status: 'live',
    embedBlocked: true,
  },
  {
    name: '5-3. 판매처 데이터 자동 업로드',
    desc: '판매처별 데이터 자동 업로드 도구',
    owner: '김도영',
    developer: '렛서',
    category: '영업',
    url: 'https://rototobebe-data-loader.vercel.app/',
    status: 'live',
    embedBlocked: true,
  },
  // 6. CX
  {
    name: '6-1. 교환/반품/취소',
    desc: '교환·반품·취소 데이터 분석',
    owner: '이상희',
    developer: '사내',
    category: 'CX',
    url: 'https://y-dusky-seven-89.vercel.app/',
    status: 'live',
  },
  {
    name: '6-2. 시즌별 불량 현황',
    desc: '시즌별 불량 상품 취합 및 비교',
    owner: '강민선',
    developer: '사내',
    category: 'CX',
    url: 'https://quality-dashboard-five.vercel.app',
    status: 'live',
  },
  // 7. 관리자
  {
    name: '권한 관리',
    desc: '웹페이지 별 접근권한 관리',
    owner: '배상현',
    developer: '렛서',
    category: '관리자',
    url: 'https://rototobebe-admin.vercel.app/',
    status: 'live',
    embedBlocked: true,
  },
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
        d.developer.toLowerCase().includes(q),
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
                  <span className="erp-nav-num">{cat.num}.</span>
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
                          <span className="erp-nav-item-dev">{d.developer}</span>
                          <span className={`erp-badge-mini ${isLive ? 'ok' : 'pending'}`}>
                            {isLive ? '완료' : '미완료'}
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
          <div className="erp-kpi-label">미완료</div>
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
              <th style={{ width: 160 }}>유지/담당</th>
              <th style={{ width: 100 }}>개발자</th>
              <th style={{ width: 100 }}>현상태</th>
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
                <td>{d.developer}</td>
                <td>
                  <span className={`erp-pill ${d.status === 'live' ? 'ok' : 'pending'}`}>
                    {d.status === 'live' ? '● 완료' : '● 미완료'}
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
            <span className="erp-pill pending">● 미완료</span>
          </div>
          <p className="erp-page-sub">{dash.desc}</p>
        </div>
        <div className="erp-panel">
          <div className="erp-panel-head">
            <h2 className="erp-panel-title">기본 정보</h2>
          </div>
          <div className="erp-field-grid">
            <div className="erp-field"><span>분류</span><b>{dash.category}</b></div>
            <div className="erp-field"><span>유지/담당</span><b>{dash.owner}</b></div>
            <div className="erp-field"><span>개발자</span><b>{dash.developer}</b></div>
            <div className="erp-field"><span>URL</span><b className="erp-url">—</b></div>
          </div>
          <div className="erp-actions">
            <button className="erp-btn disabled" disabled>미완료 (링크 준비 예정)</button>
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
                {isLive ? '● 완료' : '● 미완료'}
              </span>
            </div>
            <div className="erp-embed-sub">{dash.desc} · {dash.developer} · {dash.owner}</div>
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
            <div className="erp-field"><span>분류</span><b>{dash.category}</b></div>
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
