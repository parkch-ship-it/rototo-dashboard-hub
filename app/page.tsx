type Status = 'live' | 'pending';

type Dashboard = {
  name: string;
  desc: string;
  owner: string;
  team: string;
  url?: string;
  icon: string;
  status: Status;
};

const DASHBOARDS: Dashboard[] = [
  {
    name: '경영 전략 종합 대시보드',
    desc: '경영 전략 수립을 위한 종합 인사이트',
    owner: '배상현',
    team: '대표이사',
    url: 'https://kidsintel-dashboard.vercel.app/',
    icon: '◆',
    status: 'live',
  },
  {
    name: '판매 대시보드',
    desc: '상품별 일일 판매 현황과 채널 성과',
    owner: '배상현',
    team: '대표이사',
    url: 'https://sales-dashboard-topaz-seven.vercel.app/product-daily',
    icon: '$',
    status: 'live',
  },
  {
    name: '예산관리 대시보드',
    desc: '예산 집행 현황 및 잔여 한도 관리',
    owner: '이종민',
    team: '온라인본부',
    url: 'https://ax-dashboard-opal.vercel.app/budget',
    icon: '◷',
    status: 'live',
  },
  {
    name: '할인율 대시보드',
    desc: '판매처/상품별 할인율 분석 및 마크다운 추세',
    owner: '김지선',
    team: '상품기획팀',
    url: 'https://rototo-dashboard.vercel.app/dashboard',
    icon: '%',
    status: 'live',
  },
  {
    name: '의류 생산 공정 현황',
    desc: '생산 단계별 진행 상황을 단일 보드에서 추적',
    owner: '박철',
    team: '생산품질팀',
    url: 'https://production-dashboard-next.vercel.app/',
    icon: '⚙',
    status: 'live',
  },
  {
    name: 'SNS 운영 대시보드',
    desc: '인스타그램·SNS 채널 성과 추적',
    owner: '김선애',
    team: '영업마케팅팀',
    url: 'https://sns-deploy.vercel.app',
    icon: '#',
    status: 'live',
  },
  {
    name: '로덕메이트 대시보드',
    desc: '로덕메이트 운영 현황 및 시딩 관리',
    owner: '김선애',
    team: '영업마케팅팀',
    url: 'https://roduk-deploy.vercel.app',
    icon: '◎',
    status: 'live',
  },
  {
    name: '교환/반품 취소율 데이터',
    desc: '교환·반품·취소 사유와 비율 데이터 분석',
    owner: '이상희',
    team: 'CS팀',
    url: 'https://y-dusky-seven-89.vercel.app/',
    icon: '↺',
    status: 'live',
  },
  {
    name: '콘텐츠 주제 & 캡션 자동화',
    desc: 'SNS 콘텐츠 주제·캡션 자동 생성 도구',
    owner: '김선애',
    team: '영업마케팅팀',
    icon: '✎',
    status: 'pending',
  },
  {
    name: '인스타 수치 데이터 자동화',
    desc: '인스타그램 KPI 수집·집계 자동화',
    owner: '김선애',
    team: '영업마케팅팀',
    icon: '∿',
    status: 'pending',
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
            <span>2026.04 기준</span>
          </div>
        </div>
      </header>

      <main className="container hub-main">
        <div className="section-rule" />
        <h1 className="section-title">팀별 대시보드 — AI 교육을 통해 직접 제작</h1>

        <div className="dash-grid">
          {DASHBOARDS.map((d) => {
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
                    {isLive ? '운영 중' : '개발 중'}
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
      </main>
    </div>
  );
}
