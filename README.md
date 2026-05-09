# AI To-Do List 📝

AI(Gemini)가 할 일의 난이도를 분석해주는 스마트한 투두 리스트 앱입니다.

## 📺 실행 영상
![실행 영상](./vid/todolist.mp4)

---

## 🚀 주요 기능
- **할 일 관리**: 생성, 수정, 삭제, 완료 체크 등 기본적인 투두 리스트 기능
- **AI 난이도 분석**: 할 일을 입력하면 Gemini API가 실시간으로 분석하여 `쉬움`, `중간`, `어려움`으로 자동 분류합니다.
- **실시간 저장**: Supabase를 사용하여 모든 데이터가 실시간으로 동기화됩니다.
- **모던 UI**: Tailwind CSS와 shadcn/ui 기반의 깔끔하고 직관적인 디자인을 제공합니다.

## 🛠 기술 스택
- **Framework**: Next.js (App Router)
- **Database**: Supabase
- **AI**: Google Gemini (via LangChain)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## ⚙️ 시작하기

### 1. 환경 변수 설정
`.env` 파일을 생성하고 다음 정보를 입력합니다.
```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_ANON_KEY
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### 2. 패키지 설치 및 실행
```bash
npm install
npm run dev
```

### 3. DB 스키마 설정
`supabase/migrations` 폴더에 있는 SQL 스크립트를 Supabase SQL Editor에서 실행하여 테이블을 생성하세요.
