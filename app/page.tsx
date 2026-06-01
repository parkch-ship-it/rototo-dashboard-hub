type Status = 'live' | 'pending';

type Category =
  | '경영전략'
  | '매출'
  | '관리'
  | '상품기획'
  | '브랜드마케팅'
  | '퍼포먼스마케팅'
  | '생산, 원가관리'
  | 'CX관리';

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

const CATEGORIES: Category[] = [
  '경영전략',
  '매출',
  '관리',
  '상품기획',
  '브랜드마케팅',
  '퍼포먼스마케팅',
  '생산, 원가관리',
  'CX관리',
];

const DASHBOARDS: Dashboard[] = [
  {
    name: '경영 전략 종합 대시보드',
    desc: '경영 전략 종합 인사이트',
    owner: '배상현',
    team: '대표이사',
    category: '경영전략',
    url: 'https://kidsintel-dashboard.vercel.app/',
    icon: '◆',
    status: 'live',
  },
  {
    name: '상품 판매분석',
    desc: '상품별 일일 판매 현황',
    owner: '배상현',
    team: '대표이사',
    category: '매출',
    url: 'https://sales-dashboard-topaz-seven.vercel.app/product-daily',
    icon: '$',
    status: 'live',
  },
  {
    name: '예산관리',
    desc: '예산 집행 및 관리',
    owner: '이종민',
    team: '경영지원본부',
    category: '관리',
    url: 'https://ax-dashboard-opal.vercel.app/budget',
    icon: '◷',
    status: 'live',
  },
  {
    name: '할인율 분석',
    desc: '판매처/상품별 할인율 분석',
    owner: '김지선',
    team: '상품기획팀',
    category: '상품기획',
    url: 'https://rototo-dashboard.vercel.app/dashboard',
    icon: '%',
    status: 'live',
  },
  {
    name: 'ASSORT 분석',
    desc: '상품 속성별 사이즈 DATA 분석',
    owner: '김지선',
    team: '상품기획팀',
    category: '상품기획',
    url: 'https://rototo-dash-v2.vercel.app/assort',
    icon: '▤',
    status: 'live',
  },
  {
    name: '디자인실 일정 관리 대시보드',
    desc: '시즌 MDP 관리 및 스케쥴 공유',
    owner: '김보경',
    team: '디자인팀',
    category: '상품기획',
    url: 'https://design-dashboard-eosin.vercel.app/dashboard',
    icon: '✦',
    status: 'live',
  },
  {
    name: '인스타그램 운영 지표',
    desc: '인스타 채널 일별 지표 (메타 비즈니스 데이터)',
    owner: '김선애',
    team: '영업마케팅팀',
    category: '브랜드마케팅',
    url: 'https://rototobebe-mkt.vercel.app',
    icon: '◉',
    status: 'live',
  },
  {
    name: '로덬메이트 여름 운영 현황',
    desc: '로덬메이트 멤버 적립금 현황',
    owner: '김선애',
    team: '영업마케팅팀',
    category: '브랜드마케팅',
    url: 'https://roduk-deploy.vercel.app',
    icon: '☀',
    status: 'live',
  },
  {
    name: '네이버 쇼핑 키워드 분석(월간/주간)',
    desc: '네이버 쇼핑 키워드 분석',
    owner: '김선애',
    team: '영업마케팅팀',
    category: '브랜드마케팅',
    url: 'https://insight-deploy.vercel.app',
    icon: '⌕',
    status: 'live',
  },
  {
    name: '로토토베베 사이즈 추천폼',
    desc: 'ROTOTOBEBE 사이즈 추천 도구',
    owner: '김선애',
    team: '영업마케팅팀',
    category: '퍼포먼스마케팅',
    url: 'https://rototobebe-size.vercel.app',
    icon: '⊕',
    status: 'live',
  },
  {
    name: '로덬메이트 운영 자동화',
    desc: '로덬메이트 운영 자동화 (예정)',
    owner: '김선애',
    team: '영업마케팅팀',
    category: '퍼포먼스마케팅',
    icon: '⚡',
    status: 'pending',
  },
  {
    name: '의류 생산 공정 현황',
    desc: '생산 단계별 진행 상황',
    owner: '박철',
    team: '생산품질팀',
    category: '생산, 원가관리',
    url: 'https://production-dashboard-next.vercel.app/',
    icon: '⚙',
    status: 'live',
  },
  {
    name: '원가현황 분석',
    desc: '시즌별, 카테고리별 원가율 분석',
    owner: '박철',
    team: '생산품질팀',
    category: '생산, 원가관리',
    url: 'https://rototobebe-cost-dashboard.vercel.app/?year=2025',
    icon: '◰',
    status: 'live',
  },
  {
    name: '교환/반품 취소율 데이터',
    desc: '교환·반품·취소 데이터 분석',
    owner: '이상희',
    team: 'CX팀',
    category: 'CX관리',
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
          const list = DASHBOARDS.filter((d) => d.category === cat);
          if (list.length === 0) return null;
          return (
            <section key={cat} className="cat-section">
              <div className="cat-head">
                <span className="team-dot" />
                <span className="cat-name">{cat}</span>
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
                          {isLive ? '완료' : '개발중'}
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
