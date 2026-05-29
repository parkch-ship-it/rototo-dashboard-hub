type Status = 'live' | 'pending';

type Category =
  | '경영전략'
  | '매출 및 예산 집행'
  | '상품기획'
  | '마케팅'
  | '생산'
  | 'CS';

type Dashboard = {
  name: string;
  desc: string;
  owner: string;
  team: string;
  category: Category;
  url?: string;
  icon: string;
  status: Status;
};

const CATEGORIES: { key: Category; desc: string }[] = [
  { key: '경영전략', desc: '경영 의사결정을 위한 종합 인사이트' },
  { key: '매출 및 예산 집행', desc: '판매 실적과 예산·정산 현황 관리' },
  { key: '상품기획', desc: '할인 정책 및 상품 속성 데이터 분석' },
  { key: '마케팅', desc: 'SNS·콘텐츠 운영 현황과 성과 추적' },
  { key: '생산', desc: '생산 단계별 진행 상황 추적' },
  { key: 'CS', desc: '교환·반품·취소 데이터 분석' },
];

const DASHBOARDS: Dashboard[] = [
  // 경영전략
  {
    name: '경영 전략 종합 대시보드',
    desc: '경영 전략 수립을 위한 종합 인사이트',
    owner: '배상현',
    team: '대표이사',
    category: '경영전략',
    url: 'https://kidsintel-dashboard.vercel.app/',
    icon: '◆',
    status: 'live',
  },
  // 매출 및 예산 집행
  {
    name: '판매 대시보드',
    desc: '상품별 일일 판매 현황과 채널 성과',
    owner: '배상현',
    team: '대표이사',
    category: '매출 및 예산 집행',
    url: 'https://sales-dashboard-topaz-seven.vercel.app/product-daily',
    icon: '$',
    status: 'live',
  },
  {
    name: '예산관리 대시보드',
    desc: '예산 집행 현황 및 잔여 한도 관리',
    owner: '이종민',
    team: '경영지원본부',
    category: '매출 및 예산 집행',
    url: 'https://ax-dashboard-opal.vercel.app/budget',
    icon: '◷',
    status: 'live',
  },
  // 상품기획
  {
    name: '할인율 대시보드',
    desc: '판매처/상품별 할인율 분석 및 마크다운 추세',
    owner: '김지선',
    team: '상품기획팀',
    category: '상품기획',
    url: 'https://rototo-dashboard.vercel.app/dashboard',
    icon: '%',
    status: 'live',
  },
  {
    name: 'ASSORT 대시보드',
    desc: '상품 속성별 사이즈 DATA 분석',
    owner: '김지선',
    team: '상품기획팀',
    category: '상품기획',
    url: 'https://rototo-dash-v2.vercel.app/assort',
    icon: '▤',
    status: 'live',
  },
  // 마케팅
  {
    name: '인스타그램 운영 지표',
    desc: '인스타 채널 일별 지표 (메타 비즈니스 데이터)',
    owner: '김선애',
    team: '영업마케팅팀',
    category: '마케팅',
    url: 'https://rototobebe-mkt.vercel.app',
    icon: '◉',
    status: 'live',
  },
  {
    name: '로덕메이트 여름 운영 현황',
    desc: '로덕메이트 멤버 적립금 현황',
    owner: '김선애',
    team: '영업마케팅팀',
    category: '마케팅',
    url: 'https://roduk-deploy.vercel.app',
    icon: '☀',
    status: 'live',
  },
  {
    name: '네이버 쇼핑 키워드 분석',
    desc: '월간/주간 네이버 쇼핑 키워드 분석',
    owner: '김선애',
    team: '영업마케팅팀',
    category: '마케팅',
    url: 'https://insight-deploy.vercel.app',
    icon: '⌕',
    status: 'live',
  },
  {
    name: '로토토베베 사이즈 추천 도구',
    desc: '권장 사이즈 기준표 + 질병관리청 2017 소아청소년 성장도표 기반',
    owner: '김선애',
    team: '영업마케팅팀',
    category: '마케팅',
    url: 'https://rototobebe-size.vercel.app',
    icon: '⊕',
    status: 'live',
  },
  {
    name: '로덕메이트 운영 자동화',
    desc: '로덕메이트 운영 자동화 (예정)',
    owner: '김선애',
    team: '영업마케팅팀',
    category: '마케팅',
    icon: '⚡',
    status: 'pending',
  },
  // 생산
  {
    name: '의류 생산 공정 현황',
    desc: '생산 단계별 진행 상황을 단일 보드에서 추적',
    owner: '박철',
    team: '생산품질팀',
    category: '생산',
    url: 'https://production-dashboard-next.vercel.app/',
    icon: '⚙',
    status: 'live',
  },
  {
    name: '원가분석 대시보드',
    desc: '품목별 원가 구성 및 마진 분석',
    owner: '박철',
    team: '생산품질팀',
    category: '생산',
    url: 'https://rototobebe-cost-dashboard.vercel.app/?year=2025',
    icon: '◰',
    status: 'live',
  },
  // CS
  {
    name: '교환/반품 취소율 데이터',
    desc: '교환·반품·취소 사유와 비율 데이터 분석',
    owner: '이상희',
    team: 'CX팀',
    category: 'CS',
    url: 'https://y-dusky-seven-89.vercel.app/',
    icon: '↺',
    status: 'live',
  },
];

export default function HomePage() {
  return (
    <div className="page">
      <header className="header">
        <div className="container header-inner">
          <div className="brand">
            <span className="brand-bar" />
            <span className="brand-name">ROTOTO BEBE</span>
            <span className="brand-badge">전사 대시보드 허브</span>
          </div>
          <div className="header-meta">
            <span>2026.05 기준</span>
          </div>
        </div>
      </header>

      <main className="container hub-main">
        <div className="section-rule" />
        <h1 className="section-title">기능별 대시보드 — AI 교육을 통해 직접 제작</h1>

        {CATEGORIES.map((cat) => {
          const list = DASHBOARDS.filter((d) => d.category === cat.key);
          if (list.length === 0) return null;
          return (
            <section key={cat.key} className="cat-section">
              <div className="cat-head">
                <span className="team-dot" />
                <span className="cat-name">{cat.key}</span>
                <span className="cat-desc">{cat.desc}</span>
                <span className="team-count">· {list.length}개</span>
              </div>
              <div className="dash-grid">
                {list.map((d) => {
                  const isLive = d.status === 'live' && d.url;
                  const Card = (
                    <>
                      <div className="dash-card-head">
                        <span className="dash-icon">{d.icon}</span>
                        <span className="dash-arrow">›</span>
                      </div>
                      <div className="dash-name">{d.name}</div>
                      <div className="dash-desc">{d.desc}</div>
                      <div className="dash-meta">
                        <span className="dash-owner">{d.team} · {d.owner}</span>
                        <span className={`dash-status ${isLive ? '' : 'pending'}`}>
                          {isLive ? '운영 중' : '준비 중'}
                        </span>
                      </div>
                    </>
                  );

                  return isLive ? (
                    <a
                      key={d.name}
                      className="dash-card"
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {Card}
                    </a>
                  ) : (
                    <div key={d.name} className="dash-card disabled">
                      {Card}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>
    </div>
  );
}
