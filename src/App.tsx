import { useState } from "react";

const T = {
  paper:"#FAF8F4", paperDim:"#F2EFE9", ink:"#1C1917", inkLight:"#78716C",
  inkFaint:"#C4B9B0", line:"#E8E2DA", amber:"#C2621C", amberBg:"#FDF3EA",
  amberMid:"#E8A060", green:"#2D6A4F", greenBg:"#EAF4EF",
  red:"#B91C1C", redBg:"#FEF2F2", blue:"#1D4ED8", blueBg:"#EFF6FF",
  purple:"#6D28D9", purpleBg:"#F5F3FF", white:"#FFFFFF",
};

const GS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700;800;900&display=swap');
    *{box-sizing:border-box;margin:0;padding:0}
    ::-webkit-scrollbar{display:none}
    button,input,textarea{font-family:'M PLUS Rounded 1c',sans-serif}
    @keyframes fu{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes pop{0%{transform:scale(0.8);opacity:0}60%{transform:scale(1.06)}100%{transform:scale(1);opacity:1}}
    @keyframes slide{from{transform:translateX(100%)}to{transform:translateX(0)}}
    .fu{animation:fu 0.4s ease both}
    .fu1{animation:fu 0.4s 0.06s ease both}
    .fu2{animation:fu 0.4s 0.12s ease both}
    .fu3{animation:fu 0.4s 0.18s ease both}
    .fu4{animation:fu 0.4s 0.24s ease both}
    .pop{animation:pop 0.45s cubic-bezier(0.16,1,0.3,1) both}
    .slide{animation:slide 0.3s cubic-bezier(0.16,1,0.3,1) both}
  `}</style>
);

// ─── 共通UI ──────────────────────────────────────────────
const Btn = ({children,onClick,v="primary",size="md",disabled,full,style:ex}) => {
  ex = ex||{};
  const vs = {
    primary: {background:T.ink,color:T.white,border:"none"},
    amber:   {background:T.amber,color:T.white,border:"none"},
    outline: {background:"transparent",color:T.ink,border:`1.5px solid ${T.line}`},
    ghost:   {background:"transparent",color:T.inkLight,border:"none"},
    green:   {background:T.green,color:T.white,border:"none"},
  }[v];
  const ps = {lg:"14px 28px",md:"10px 20px",sm:"7px 14px"}[size];
  const fs = {lg:15,md:13,sm:12}[size];
  return (
    <button onClick={onClick} disabled={disabled} style={{
      ...vs,...ex, padding:ps, fontSize:fs, fontWeight:700, borderRadius:12,
      cursor:disabled?"default":"pointer", opacity:disabled?0.4:1,
      display:"inline-flex", alignItems:"center", justifyContent:"center", gap:6,
      width:full?"100%":"auto", transition:"opacity 0.15s",
    }}>{children}</button>
  );
};

const Tag = ({label,color=T.inkFaint,bg=T.paperDim}) => (
  <span style={{background:bg,color,borderRadius:5,padding:"2px 8px",fontSize:10,fontWeight:700}}>{label}</span>
);

const Card = ({children,style:ex}) => {
  ex = ex||{};
  return <div style={{background:T.white,borderRadius:16,border:`1px solid ${T.line}`,...ex}}>{children}</div>;
};

// ─── ステップ＋タスク5W1Hデータ ─────────────────────────
const TASK_DETAIL = {
  "1-0":{
    what:"家族全員で「家を買う目的」を話し合うこと",
    why:"夫婦・家族で優先順位が違うと、物件選びで必ずズレが生じます。最初に合わせておくことで、迷いが格段に減ります。",
    who:"夫婦・パートナー・同居家族全員で",
    when:"ielogi診断を受ける前に",
    how:"ielogi診断の「条件診断」を2人で受けると、意見の差分が一目でわかります。",
  },
  "1-1":{
    what:"「理想の毎日の暮らし」を具体的に文字にすること",
    why:"スペック（広さ・駅距離・築年数）だけで選ぶと後悔しやすい。どんな毎日を送りたいかから逆算すると、本当に必要な条件が見えてきます。",
    who:"自分自身で（パートナーと別々に書いてから見せ合うのが有効）",
    when:"物件を探し始める前に",
    how:"「朝起きたら何をしている？」「子どもが帰ってきたとき、どんな空間にいる？」など、シーンを想像しながら書くと具体的になります。",
  },
  "1-2":{
    what:"ielogiの4つの診断（条件・予算・ローン・住まいタイプ）を受けること",
    why:"自分の判断軸を言語化できていない状態で物件を見ると、比較ができず疲弊します。まず自分の軸を整理することが大切です。",
    who:"自分で（2人で受けると差分が見えてより有効）",
    when:"仲介担当者との面談前に",
    how:"診断タブから4つの診断を順番に受けてください。結果は保存できます。",
  },
  "2-0":{
    what:"住宅購入についてわからないこと・気になることをすべて書き出すこと",
    why:"「なんとなく不安」のまま面談に臨むと、聞きたいことを聞けないまま終わりがちです。書き出すことで整理されます。",
    who:"自分で（夫婦別々に書いてまとめると良い）",
    when:"初回面談の1週間前までに",
    how:"「これって聞いてもいいのかな…」というような基本的な疑問も全部書いてOK。仲介担当者への質問リストになります。",
  },
  "2-1":{
    what:"「購入への不安」を感情ごと書き出すこと",
    why:"不安を放置したまま進むと、後で意思決定が止まります。書いて整理することで、仲介担当者に的確に相談できます。",
    who:"自分で",
    when:"わからないことリストと同時に",
    how:"「ローンが払えなくなったら？」「離婚したら？」「転勤になったら？」など、最悪のシナリオも含めて書いてみましょう。",
  },
  "2-2":{
    what:"わからないこと・不安リストを「仲介担当者に聞きたい質問」に整理すること",
    why:"面談時間は限られています。優先順位をつけた質問リストがあると、面談の質が大幅に上がります。",
    who:"自分で",
    when:"初回面談の前日までに",
    how:"重要度順に並べ替えて、「絶対聞く」「できれば聞く」に分けておくと当日スムーズです。",
  },
  "3-0":{
    what:"ielogiの診断結果をスマホで開いておくこと",
    why:"面談で「自分の優先順位」を説明するとき、診断結果を見せると話が早い。仲介担当者も顧客理解が深まります。",
    who:"自分で",
    when:"面談当日、出発前に",
    how:"診断タブの「履歴」から最新の結果を開いておく。画面をスクリーンショットしておくとさらに安心。",
  },
  "3-1":{
    what:"事前に作った疑問リストを仲介担当者と共有すること",
    why:"質問リストを渡すと面談が効率的になり、限られた時間で多くの疑問が解消されます。",
    who:"自分から仲介担当者へ",
    when:"面談の冒頭で",
    how:"「事前に質問をまとめてきました」と渡せば、仲介担当者も準備しやすくなります。",
  },
  "3-2":{
    what:"面談後に届いたノートの内容を確認すること",
    why:"口頭で聞いた内容は忘れやすい。ノートに残ることで「決まったこと」が夫婦間で共有でき、次の行動が明確になります。",
    who:"自分（とパートナー）で",
    when:"面談翌日までに",
    how:"ノートタブから確認してリアクションやコメントを返すと、仲介担当者との信頼関係が深まります。",
  },
  "4-0":{
    what:"「これだけは譲れない」条件を3つに絞り込むこと",
    why:"条件が多すぎると物件がゼロになります。「全部欲しい」は「全部を失う」ことと同義。3つに絞ることで探しやすくなります。",
    who:"夫婦・パートナーで合意した上で",
    when:"物件探しを始める前に",
    how:"ielogiの条件診断の結果を参照しながら、「これがなければ買わない」ものだけを選ぶ。学区・ペット可・駅距離など。",
  },
  "4-1":{
    what:"「あれば嬉しいが、なくても買う」条件を整理すること",
    why:"絶対条件以外は妥協できる条件。これを明確にしておくと、「惜しい物件」を諦める判断が楽になります。",
    who:"夫婦・パートナーで",
    when:"絶対条件を決めた直後に",
    how:"「バルコニー広め」「宅配ボックスあり」「南向き」など、優先度をつけてリスト化しましょう。",
  },
  "4-2":{
    what:"物件を探すエリアと沿線を2〜3本に絞ること",
    why:"エリアを絞らないと物件数が膨大になり比較できなくなります。また通勤・保育園・生活圏をすべて満たすエリアは意外と狭い。",
    who:"夫婦・パートナーで",
    when:"絶対条件・妥協条件を整理した後に",
    how:"通勤時間・保育園の場所・実家へのアクセスなど、家族全員の生活動線を地図上で確認しながら絞り込む。",
  },
  "5-0":{
    what:"世帯の手取り年収と月々の手取りを正確に把握すること",
    why:"住宅ローンの審査は税込年収で行われますが、実際の生活は手取りベース。手取りを把握せずに借入額を決めると生活が苦しくなります。",
    who:"夫婦それぞれが自分の源泉徴収票を確認して",
    when:"予算設定の最初に",
    how:"直近の源泉徴収票の「支払金額（税込年収）」と、直近の給与明細の手取り額を確認する。",
  },
  "5-1":{
    what:"頭金として用意できる金額の上限を決めること",
    why:"頭金は多ければ多いほどローン残高が減りますが、手元資金が薄くなるリスクもあります。育休・転職・修繕費などの備えは別途確保が必要。",
    who:"夫婦で",
    when:"世帯年収を把握した後に",
    how:"ielogiの予算診断を参照。貯蓄のうち「緊急時の6ヶ月分生活費」を除いた残りを頭金の最大値と考えると安全。",
  },
  "5-2":{
    what:"家族が無理なく払い続けられる月々の返済額の上限を設定すること",
    why:"審査通過額（借りられる額）と、生活が成り立つ額（借りていい額）は別物。返済比率は手取りの25〜30%以内が目安。",
    who:"夫婦で合意した上で",
    when:"頭金を決めた後に",
    how:"「月々の返済が○万円なら、残りで生活・貯蓄・教育費が賄えるか？」を具体的な数字でシミュレーションする。",
  },
  "6-0":{
    what:"直近2年分の源泉徴収票と必要書類を揃えること",
    why:"事前審査には源泉徴収票が必須。直近2年分がないと審査できない銀行もあります。早めに準備することで審査をスムーズに進められます。",
    who:"自分で（夫婦それぞれ）",
    when:"事前審査の申請を決めた直後に",
    how:"会社から発行された源泉徴収票を2年分、本人確認書類（マイナンバーカード等）、銀行によっては健康保険証のコピーが必要。",
  },
  "6-1":{
    what:"審査申請のために使う「仮の物件」を1つ選ぶこと",
    why:"事前審査は物件を確定させなくても申請できますが、物件情報（価格・所在地）が必要な銀行が多い。近い条件の候補物件を1つ選んで使います。",
    who:"自分で（仲介担当者に相談しながら）",
    when:"書類を揃えた後に",
    how:"今の最有力候補物件でOK。あくまで仮物件なので、後で変更できます。",
  },
  "6-2":{
    what:"複数の銀行に同時に事前審査を申請すること",
    why:"1行だけだと比較ができず、金利・条件の良し悪しがわかりません。3行以上申請しておくと、交渉力も生まれます。",
    who:"仲介担当者のサポートを受けながら自分で",
    when:"書類と仮物件を用意した後すぐに",
    how:"メガバンク・ネット銀行・地方銀行など種類を分けて申請すると比較しやすい。仲介担当者が銀行の選定を手伝ってくれます。",
  },
  "7-0":{
    what:"内見前に「見るべきポイント」をリスト化しておくこと",
    why:"内見は感情が先行しがちで、冷静に確認すべき点を見落としやすい。事前にチェックリストを作っておくと抜け漏れを防げます。",
    who:"夫婦で",
    when:"内見の前日までに",
    how:"日当たり・収納量・水回りの状態・周辺の騒音・マンションなら管理の状態（ポストや共用部の清潔さ）などをリスト化する。",
  },
  "7-1":{
    what:"スペックだけでなく「住んでいる自分」を想像しながら確認すること",
    why:"写真映えする物件が実際には暮らしにくいことも多い。五感（音・匂い・光・動線）で確かめることが重要です。",
    who:"夫婦で（できれば子ども連れで）",
    when:"内見当日",
    how:"「朝、ここで子どもを送り出せるか」「帰宅後の動線は？」など、実際のシーンをロールプレイしながら歩いてみる。",
  },
  "7-2":{
    what:"内見後に仲介担当者が送ってくれたノートの内容を確認すること",
    why:"内見直後は感情的になりやすい。ノートに整理された「決まったこと」「次のアクション」を冷静に読み返すことで判断が安定します。",
    who:"夫婦で",
    when:"内見から24時間以内に",
    how:"ノートタブから確認。気になることはコメントで質問しておくと、次の内見前に解決できます。",
  },
  "8-0":{
    what:"購入に迷っている理由を全部書き出すこと",
    why:"「なんとなく不安」のまま止まると決断できません。書き出すことで「本質的な懸念」と「感情的なためらい」を分けることができます。",
    who:"自分で（夫婦別々に書いてから共有）",
    when:"良い物件に出会った後、判断に迷っているとき",
    how:"「この物件を買わない理由」を全部書く。書き出した後、それぞれに「解決できるか？」を考えると整理されます。",
  },
  "8-1":{
    what:"迷っている内容を仲介担当者と一緒に言葉にして整理すること",
    why:"プロの第三者視点で整理してもらうことで、思い込みや誤解に気づけます。「買って後悔した」を防ぐための重要なステップ。",
    who:"仲介担当者と",
    when:"買付を出す前に",
    how:"書き出した迷いリストを仲介担当者に送る。「これは解決できる問題か、そうでないか」を一緒に仕分けてもらう。",
  },
  "8-2":{
    what:"購入の意思表示として「買付申込書」を提出すること",
    why:"良い物件はすぐに他の買主に取られます。迷いが解消されたら素早く動くことが大切です。",
    who:"仲介担当者経由で",
    when:"買付判断が固まったらすぐに",
    how:"買付申込書は価格交渉の書面でもあります。希望価格・手付金・引き渡し希望日などを仲介担当者と相談しながら記入します。",
  },
  "9-0":{
    what:"重要事項説明書の内容を仲介担当者の説明を聞きながら確認すること",
    why:"重要事項説明は法律で義務付けられた説明で、物件の重要な情報がすべて記載されています。聞き逃すと後で大きなトラブルになることも。",
    who:"買主（自分）と売主・仲介担当者で",
    when:"売買契約の当日または前日に",
    how:"わからない言葉や気になる点はその場で必ず質問する。「後で聞けばいいか」は禁物です。",
  },
  "9-1":{
    what:"売買契約書に署名・押印して手付金を支払うこと",
    why:"契約締結により売買が法的に成立します。この段階で簡単には撤回できなくなるため、内容をしっかり確認することが大切です。",
    who:"買主（自分）・売主・仲介担当者立ち会いで",
    when:"重要事項説明の後に",
    how:"契約書の内容を事前に確認しておく。手付金（通常は物件価格の5〜10%）を用意しておく。",
  },
  "9-2":{
    what:"ローン決済・所有権移転登記を完了して鍵を受け取ること",
    why:"残代金の支払いと同時に所有権が移転します。これで晴れて自分の家になります。",
    who:"買主・売主・銀行・司法書士・仲介担当者全員で",
    when:"契約から1〜2ヶ月後（ローン実行日）に",
    how:"司法書士が所有権移転登記を行います。鍵を受け取ったら、その日から自分の家です 🎉",
  },
};

const STEPS = [
  {id:1,e:"🪞",name:"自己分析",  desc:"何のために買うかを言葉にする",
   tasks:["家族の優先順位を話し合う","理想の暮らしを書き出す","ielogi診断を受ける"]},
  {id:2,e:"🤔",name:"疑問整理",  desc:"わからないことを全部出し切る",
   tasks:["わからないことをリストアップ","不安を書き出す","聞きたいことをまとめる"]},
  {id:3,e:"💬",name:"初回面談",  desc:"仲介担当者と方向性を確認する",
   tasks:["診断結果を手元に用意する","疑問リストを共有する","面談ノートを確認する"]},
  {id:4,e:"📌",name:"条件整理",  desc:"絶対条件と妥協できる条件を仕分ける",
   tasks:["絶対条件を3つに絞る","妥協できる条件を仕分ける","エリア・沿線を絞る"]},
  {id:5,e:"💴",name:"予算設定",  desc:"無理なく払える数字を確定させる",
   tasks:["世帯年収・手取りを整理","頭金の額を決める","月々の上限返済額を決める"]},
  {id:6,e:"🏦",name:"事前審査",  desc:"借りられる金額を銀行に確かめる",
   tasks:["源泉徴収票を用意する","仮物件を選ぶ","複数の銀行に申請する"]},
  {id:7,e:"🚪",name:"内見",      desc:"候補物件を実際に体で確かめる",
   tasks:["内見リストを作る","現地で確かめる","内見ノートを確認する"]},
  {id:8,e:"⚖️",name:"買付判断", desc:"迷いを整理して答えを出す",
   tasks:["迷いを全部書き出す","仲介担当者と言語化する","買付書を提出する"]},
  {id:9,e:"🎉",name:"契約・決済",desc:"いよいよ自分の家になる",
   tasks:["重要事項説明を聞く","売買契約書に署名する","鍵を受け取る 🎉"]},
];

// ─── タスク完了に応じて条件・予算を動的に生成 ───────────
function deriveHomeData(checkedTasks) {
  const done = id => !!checkedTasks[id];

  // 条件タグ：タスクが完了するにつれ徐々に埋まっていく
  const condTags = [];
  if (done("4-2")) condTags.push("渋谷・目黒・世田谷");
  else if (done("1-0")) condTags.push("エリア検討中…");
  if (done("4-0")) { condTags.push("50㎡以上"); condTags.push("学区"); }
  if (done("4-1")) condTags.push("築20年以内");
  if (done("1-1")) condTags.push("マンション");
  if (done("4-0") && done("4-1")) condTags.push("ペット可");

  // 予算：STEP5のタスク完了で埋まっていく
  const finDone = done("5-0") && done("5-1") && done("5-2");
  const fin = finDone
    ? {budget:"5,500万円", monthly:"12.2万円", note:"変動0.4%・35年", loan:"4,800万円", ratio:"22.4%", diff:"月3.8万円↓", deduction:"最大336万円"}
    : done("5-0")
    ? {budget:"試算中…", monthly:"—", note:"", loan:"—", ratio:"—", diff:"—", deduction:"—"}
    : null;

  return {condTags, fin};
}

const SAMPLE_NOTES = [
  {id:"n1",date:"3月20日",type:"meeting",title:"初回面談まとめ",
   agentWords:"お二人の優先順位が「資産性＞エリア＞広さ」で揃っていたのが印象的でした。住み替え前提なら都心の中古マンションが特に向いています。",
   decided:["エリアは渋谷・目黒・世田谷","予算上限5,500万円"],
   homework:["源泉徴収票を用意する","ペアローンを検討する"],
   reactions:[{e:"👍",n:1,mine:true},{e:"🙏",n:1,mine:true}],
   comments:[{agent:false,text:"ペアローンについて夫婦で話してみます！"},{agent:true,text:"次回しっかり説明しますね。"}],
   unread:false, step:3},
  {id:"n2",date:"3月24日",type:"meeting",title:"資金計画の確認",
   agentWords:"頭金を抑えて手元資金を厚くする判断は正解です。育休・教育費の増加を考えると、手元の余裕はローン金利の節約より価値があります。",
   decided:["頭金500万円","変動金利で申請"],
   homework:["源泉徴収票を提出する"],
   reactions:[{e:"👍",n:1,mine:true},{e:"💡",n:1,mine:true}],
   comments:[], unread:true, step:5},
];

// ════════════════════════════════════════════════════════
// オンボーディング（初回起動）
// ════════════════════════════════════════════════════════
function Onboarding({onDone}) {
  const [page, setPage] = useState(0);

  const slides = [
    {
      emoji:"🏠",
      title:"家選びの判断軸を、\n自分で持つ。",
      sub:"条件・予算・ローン・住まいタイプ。\n4つの診断で、あなただけの軸が整います。",
      bg:T.amberBg,
    },
    {
      emoji:"👫",
      title:"夫婦の「違い」を\n見える化する。",
      sub:"2人で答えると、どこが一致して\nどこが違うかが一目でわかります。",
      bg:T.blueBg,
    },
    {
      emoji:"📋",
      title:"いまどこにいるか、\n地図として見える。",
      sub:"9つのステップで、次に何をすべきかが\n常に明確な状態をつくります。",
      bg:T.greenBg,
    },
    {
      emoji:"✉️",
      title:"仲介担当者とも\n繋がれる。",
      sub:"担当仲介担当者がいれば連携できます。\nでも、いなくても使えます。",
      bg:T.purpleBg,
    },
  ];

  const slide = slides[page];
  const isLast = page === slides.length - 1;

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:T.paper}}>
      {/* スライド */}
      <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 32px",textAlign:"center"}}>
        <div className="pop" key={page} style={{width:100,height:100,background:slide.bg,borderRadius:28,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:28,fontSize:48}}>
          {slide.emoji}
        </div>
        <div className="fu1" key={`t${page}`} style={{fontSize:26,fontWeight:900,color:T.ink,lineHeight:1.3,marginBottom:14,letterSpacing:"-0.03em",whiteSpace:"pre-line"}}>
          {slide.title}
        </div>
        <div className="fu2" key={`s${page}`} style={{fontSize:14,color:T.inkLight,lineHeight:1.85,whiteSpace:"pre-line"}}>
          {slide.sub}
        </div>
      </div>

      {/* ドット */}
      <div style={{display:"flex",justifyContent:"center",gap:7,marginBottom:20}}>
        {slides.map((_,i)=>(
          <div key={i} style={{width:i===page?20:7,height:7,borderRadius:4,background:i===page?T.ink:T.line,transition:"all 0.3s"}}/>
        ))}
      </div>

      {/* ボタン */}
      <div style={{padding:"0 24px 40px",display:"flex",flexDirection:"column",gap:10}}>
        {isLast ? (
          <>
            <Btn v="amber" full size="lg" onClick={onDone}>
              Apple IDではじめる 🍎
            </Btn>
            <Btn v="outline" full size="lg" onClick={onDone}>
              Googleではじめる
            </Btn>
          </>
        ) : (
          <>
            <Btn v="primary" full size="lg" onClick={()=>setPage(page+1)}>
              次へ →
            </Btn>
            <Btn v="ghost" full size="sm" onClick={onDone}>
              スキップ
            </Btn>
          </>
        )}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// ホームタブ
// ════════════════════════════════════════════════════════
function HomeTab({currentStep, hasAgent, setTab, setNoteOpen, condTags, fin}) {
  const step = STEPS[currentStep - 1];
  const latestUnread = SAMPLE_NOTES.find(n=>n.unread);

  return (
    <div style={{flex:1,overflowY:"auto",background:T.paper}}>
      {/* ヘッダー */}
      <div style={{background:T.white,padding:"16px 18px 14px",borderBottom:`1px solid ${T.line}`}}>
        <div style={{fontSize:11,color:T.inkLight,marginBottom:3}}>おかえり 👋</div>
        <div style={{fontSize:22,fontWeight:800,color:T.ink,letterSpacing:"-0.02em",marginBottom:12}}>
          さくら さん
        </div>
        {/* ステップバー */}
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:34,height:34,background:T.amberBg,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:17}}>
            {step.e}
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:10,color:T.amber,fontWeight:700,marginBottom:2}}>STEP {currentStep} / 9</div>
            <div style={{fontSize:13,fontWeight:700,color:T.ink}}>{step.name}</div>
          </div>
          <div style={{display:"flex",gap:3}}>
            {STEPS.map(s=>(
              <div key={s.id} style={{
                width:s.id===currentStep?12:5,height:5,borderRadius:3,
                background:s.id<currentStep?T.ink:s.id===currentStep?T.amber:T.line,
                transition:"all 0.3s",
              }}/>
            ))}
          </div>
        </div>
      </div>

      <div style={{padding:"12px 16px",display:"flex",flexDirection:"column",gap:10}}>

        {/* 未読ノート（仲介担当者連携済み） */}
        {hasAgent && latestUnread && (
          <div className="fu1" onClick={()=>{setNoteOpen(latestUnread);setTab("notes");}}
            style={{background:`linear-gradient(135deg,${T.ink},#2C2420)`,borderRadius:18,padding:"18px",cursor:"pointer",position:"relative",overflow:"hidden"}}>
            <div style={{position:"absolute",top:12,right:14,width:8,height:8,background:T.red,borderRadius:"50%"}}/>
            <div style={{fontSize:10,color:"rgba(255,255,255,0.4)",marginBottom:6,letterSpacing:"0.06em"}}>✉️ 新しいノートが届いています</div>
            <div style={{fontSize:15,fontWeight:700,color:T.white,marginBottom:5}}>{latestUnread.title}</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.55)",lineHeight:1.6,marginBottom:12}}>
              {latestUnread.agentWords.slice(0,45)}…
            </div>
            <div style={{display:"inline-flex",alignItems:"center",gap:5,background:"rgba(255,255,255,0.12)",borderRadius:20,padding:"5px 12px"}}>
              <span style={{fontSize:11,fontWeight:700,color:T.white}}>読む →</span>
            </div>
          </div>
        )}

        {/* 仲介担当者未連携のCTA */}
        {!hasAgent && (
          <div className="fu1" style={{background:T.white,borderRadius:16,border:`1.5px dashed ${T.line}`,padding:"16px"}}>
            <div style={{fontSize:11,color:T.inkLight,marginBottom:6}}>担当仲介担当者はいますか？</div>
            <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:10}}>仲介担当者と繋いで、<br/>ノートを受け取りましょう</div>
            <Btn v="primary" size="sm">連携コードを入力する</Btn>
          </div>
        )}

        {/* 候補物件リンク */}
        {hasAgent && (
          <div className="fu2" style={{display:"flex",alignItems:"center",gap:12,background:T.white,borderRadius:16,border:`1px solid ${T.line}`,padding:"14px 16px",cursor:"pointer"}}>
            <div style={{width:40,height:40,background:T.blueBg,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:20}}>🏘️</div>
            <div style={{flex:1}}>
              <div style={{fontSize:10,color:T.inkFaint,marginBottom:2}}>候補物件はこちら</div>
              <div style={{fontSize:14,fontWeight:700,color:T.ink}}>物件提案ページを見る</div>
              <div style={{fontSize:11,color:T.inkLight}}>仲介担当者から提案中の物件</div>
            </div>
            <div style={{width:28,height:28,background:T.ink,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{color:T.white,fontSize:13,fontWeight:700}}>→</span>
            </div>
          </div>
        )}

        {/* 条件サマリー */}
        <Card className="fu3" style={{padding:"14px 16px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <span style={{fontSize:13,fontWeight:700,color:T.ink}}>🏠 お部屋の条件</span>
            <span style={{fontSize:11,color:T.amber,fontWeight:600,cursor:"pointer"}}>見直す</span>
          </div>
          {condTags.length===0
            ? <span style={{fontSize:12,color:T.inkFaint}}>条件診断を受けると、ここに整理されます</span>
            : condTags.map((v,i)=>(
              <span key={i} style={{display:"inline-block",background:T.paperDim,color:T.inkLight,borderRadius:20,padding:"3px 10px",fontSize:11,marginRight:5,marginBottom:4}}>{v}</span>
            ))
          }
        </Card>

        {/* 資金サマリー */}
        <Card className="fu4" style={{overflow:"hidden"}}>
          <div style={{padding:"12px 16px 10px",display:"flex",justifyContent:"space-between"}}>
            <span style={{fontSize:13,fontWeight:700,color:T.ink}}>💰 資金計画</span>
            <span style={{fontSize:11,color:T.amber,fontWeight:600,cursor:"pointer"}}>見直す</span>
          </div>
          {!fin ? (
            <div style={{padding:"16px",textAlign:"center"}}>
              <div style={{fontSize:12,color:T.inkFaint,lineHeight:1.7}}>STEP 5「予算設定」を完了すると<br/>資金計画がここに表示されます</div>
            </div>
          ) : (
            <>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:1,background:T.line}}>
                {[{l:"購入予算",v:fin.budget},{l:"月々返済",v:fin.monthly,n:fin.note}].map(item=>(
                  <div key={item.l} style={{background:T.white,padding:"12px 14px"}}>
                    <div style={{fontSize:10,color:T.inkLight,marginBottom:3}}>{item.l}</div>
                    <div style={{fontSize:18,fontWeight:800,color:T.ink}}>{item.v}</div>
                    {item.n&&<div style={{fontSize:9,color:T.inkFaint,marginTop:1}}>{item.n}</div>}
                  </div>
                ))}
              </div>
              <div style={{padding:"10px 14px",display:"flex",flexDirection:"column",gap:5}}>
                {[
                  {l:"借入可能額（審査3.0%）",v:fin.loan},
                  {l:"返済比率",v:fin.ratio,tag:fin.ratio!=="—"?"余裕あり":null,tc:T.green,tbg:T.greenBg},
                  {l:"家賃との差額",v:fin.diff},
                  {l:"住宅ローン控除（概算）",v:fin.deduction},
                ].map(row=>(
                  <div key={row.l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"4px 0",borderBottom:`1px solid ${T.line}`}}>
                    <span style={{fontSize:11,color:T.inkLight}}>{row.l}</span>
                    <div style={{display:"flex",alignItems:"center",gap:5}}>
                      <span style={{fontSize:12,fontWeight:700,color:T.ink}}>{row.v}</span>
                      {row.tag&&<Tag label={row.tag} color={row.tc} bg={row.tbg}/>}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// ステップタブ
// ════════════════════════════════════════════════════════
function StepsTab({currentStep, checked, setChk}) {
  const [cur, setCur] = useState(currentStep);
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");
  const [customs, setCustoms] = useState([]);
  const [taskDetail, setTaskDetail] = useState(null); // 5W1Hモーダル

  const step = STEPS[cur-1];
  const presets = step.tasks.map((t,i)=>({id:`${cur}-${i}`,text:t}));
  const custStep = customs.filter(c=>c.stepId===cur);
  const presetDone = presets.filter(t=>checked[t.id]).length;
  const allDone = presetDone === presets.length;

  const addTask = () => {
    if (!newText.trim()) return;
    setCustoms(p=>[...p,{id:`c-${Date.now()}`,stepId:cur,text:newText.trim()}]);
    setNewText(""); setAdding(false);
  };

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",minHeight:0}}>
      {/* ヘッダー */}
      <div style={{background:T.white,borderBottom:`1px solid ${T.line}`,flexShrink:0}}>
        <div style={{padding:"12px 18px 8px",display:"flex",alignItems:"flex-end",gap:8}}>
          <div style={{display:"flex",alignItems:"baseline",gap:5}}>
            <span style={{fontSize:40,fontWeight:900,color:T.ink,lineHeight:1,letterSpacing:"-0.05em"}}>
              {String(cur).padStart(2,"0")}
            </span>
            <span style={{fontSize:10,color:T.inkFaint,marginBottom:3}}>/ 09</span>
          </div>
          <div style={{paddingBottom:3,flex:1}}>
            <div style={{fontSize:16,fontWeight:700,color:T.ink}}>{step.name}</div>
            <div style={{fontSize:10,color:T.inkLight,marginTop:1}}>{step.desc}</div>
          </div>
          <span style={{fontSize:26,paddingBottom:2}}>{step.e}</span>
        </div>
        {/* 進捗バー */}
        <div style={{height:3,background:T.line,margin:"0 18px",borderRadius:2,overflow:"hidden"}}>
          <div style={{width:`${(cur/9)*100}%`,height:"100%",background:`linear-gradient(90deg,${T.ink},${T.amber})`,borderRadius:2,transition:"width 0.5s"}}/>
        </div>
        {/* チップ */}
        <div style={{display:"flex",gap:5,overflowX:"auto",padding:"8px 18px 12px",scrollbarWidth:"none"}}>
          {STEPS.map(s=>{
            const active=s.id===cur, done=s.id<cur;
            return (
              <button key={s.id} onClick={()=>setCur(s.id)} style={{
                flexShrink:0, background:active?T.ink:"transparent",
                color:active?T.white:done?T.inkFaint:T.inkLight,
                border:active?"none":`1px solid ${T.line}`,
                borderRadius:20, padding:"5px 11px", fontSize:10, fontWeight:active?700:400,
                cursor:"pointer", fontFamily:"inherit",
                textDecoration:done?"line-through":"none", transition:"all 0.2s",
              }}>
                {done&&"✓ "}{s.e} {s.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* タスク */}
      <div style={{flex:1,overflowY:"auto",padding:"14px 18px 24px"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div style={{display:"flex",alignItems:"center",gap:7}}>
            <span style={{fontSize:12,fontWeight:600,color:T.inkLight}}>タスク</span>
            <span style={{fontSize:11,color:T.inkFaint}}>{presetDone}/{presets.length}</span>
            <div style={{width:36,height:3,background:T.line,borderRadius:2,overflow:"hidden"}}>
              <div style={{width:`${(presetDone/presets.length)*100}%`,height:"100%",background:allDone?T.green:T.amber,borderRadius:2,transition:"width 0.3s"}}/>
            </div>
          </div>
          <button onClick={()=>setAdding(!adding)} style={{background:"none",border:`1px solid ${T.line}`,borderRadius:8,padding:"5px 11px",fontSize:11,color:adding?T.red:T.inkLight,cursor:"pointer",fontFamily:"inherit"}}>
            {adding?"キャンセル":"＋ 追加"}
          </button>
        </div>

        {adding && (
          <div style={{background:T.white,borderRadius:12,padding:"12px",marginBottom:10,border:`1px dashed ${T.line}`}}>
            <input autoFocus value={newText} onChange={e=>setNewText(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&addTask()}
              placeholder="やることを入力してEnter..."
              style={{width:"100%",background:"transparent",border:"none",outline:"none",fontSize:14,color:T.ink,marginBottom:8}}/>
            <Btn v="primary" size="sm" onClick={addTask}>追加</Btn>
          </div>
        )}

        <Card style={{overflow:"hidden",marginBottom:16}}>
          {[...presets,...custStep.map(c=>({...c,custom:true}))].map((task,i,arr)=>{
            const done = checked[task.id];
            return (
              <div key={task.id} style={{display:"flex",alignItems:"center",gap:11,padding:"13px 14px",borderBottom:i<arr.length-1?`1px solid ${T.line}`:"none",transition:"background 0.15s"}}>
                <button onClick={()=>setChk(p=>({...p,[task.id]:!p[task.id]}))} style={{background:"none",border:"none",padding:0,cursor:"pointer",flexShrink:0}}>
                  <div style={{width:22,height:22,borderRadius:6,border:done?"none":`1.5px solid ${T.inkFaint}`,background:done?T.ink:"transparent",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.2s"}}>
                    {done&&<span style={{color:T.white,fontSize:11,fontWeight:700}}>✓</span>}
                  </div>
                </button>
                <span style={{flex:1,fontSize:13,color:done?T.inkFaint:T.ink,textDecoration:done?"line-through":"none",lineHeight:1.4}}>
                  {task.text}
                </span>
                {task.custom && <Tag label="自分"/>}
              </div>
            );
          })}
        </Card>

        {/* 次へボタン */}
        <button disabled={!allDone} style={{
          width:"100%",background:allDone?T.ink:T.line,color:T.white,
          border:"none",borderRadius:14,padding:"15px",fontSize:14,fontWeight:700,
          cursor:allDone?"pointer":"default",transition:"all 0.3s",fontFamily:"inherit",
          display:"flex",alignItems:"center",justifyContent:"center",gap:8,
        }}>
          {allDone
            ? <><span>STEP {cur+1}へ進む</span><span style={{fontSize:18}}>→</span></>
            : <span style={{fontSize:13}}>あと {presets.length-presetDone} 件残っています</span>
          }
        </button>

        {!allDone && (
          <div style={{textAlign:"center",marginTop:8,fontSize:11,color:T.inkFaint}}>
            プリセットタスクをすべてチェックすると次へ進めます
          </div>
        )}

        {/* 仲介担当者のヒント */}
        <div style={{marginTop:16,background:T.amberBg,borderRadius:14,padding:"13px 15px",border:`1px solid ${T.amber}33`}}>
          <div style={{fontSize:11,fontWeight:700,color:T.amber,marginBottom:5}}>💡 このステップのポイント</div>
          <div style={{fontSize:12,color:T.ink,lineHeight:1.75}}>
            {cur===4 ? "「全部欲しい」は全部を失うことと同じです。絶対条件は3つまで。そこから物件探しが一気に楽になります。"
                     : "このステップを丁寧に進めることで、次のステップがずっとスムーズになります。"}
          </div>
        </div>
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// ノートタブ（常時表示・未連携時は訴求画面）
// ════════════════════════════════════════════════════════
function NotesTab({noteOpen, setNoteOpen, hasAgent, onLinkAgent}) {
  const [notes, setNotes] = useState(SAMPLE_NOTES);
  const [comment, setComment] = useState("");
  const [picker, setPicker] = useState(false);
  const unread = notes.filter(n=>n.unread).length;
  const openNote = note => {
    setNoteOpen(note);
    setNotes(p=>p.map(n=>n.id===note.id?{...n,unread:false}:n));
  };

  // ─── 未連携時の訴求画面 ─────────────────────────────
  if (!hasAgent) return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:"#FAF8F4"}}>
      <div style={{background:"#FFFFFF",padding:"14px 16px 12px",borderBottom:"1px solid #E8E2DA"}}>
        <div style={{fontSize:18,fontWeight:800,color:"#1C1917",marginBottom:3}}>✉️ ノート</div>
        <div style={{fontSize:12,color:"#78716C"}}>仲介担当者からのメッセージが届きます</div>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px"}}>
        <div style={{background:"linear-gradient(135deg,#1C1917,#2C2420)",borderRadius:20,padding:"24px 20px",marginBottom:16,textAlign:"center"}}>
          <div style={{fontSize:44,marginBottom:14}}>✉️</div>
          <div style={{fontSize:17,fontWeight:800,color:"#FFFFFF",marginBottom:10,lineHeight:1.4}}>
            仲介担当者からの<br/>ノートが届く機能です
          </div>
          <div style={{fontSize:13,color:"rgba(255,255,255,0.6)",lineHeight:1.8}}>
            面談・内見のあと、仲介担当者が<br/>「決まったこと」「宿題」「ひとこと」を<br/>まとめて送ってくれます。
          </div>
        </div>
        {[
          {e:"📝",t:"面談の内容が手元に残る",s:"「次回また最初から」がなくなります。決まったことが文字として届くので、夫婦で確認できます。"},
          {e:"👍",t:"リアクションで気持ちを伝えられる",s:"読んだことや感想を絵文字で返せます。「ありがとう」も「もう少し教えて」も、気軽に伝わります。"},
          {e:"💬",t:"コメントで非同期に質問できる",s:"気になったことをその場で書いておけます。電話を気にせず、思い立ったときに。"},
        ].map((f,i)=>(
          <div key={i} style={{background:"#FFFFFF",borderRadius:14,padding:"14px 16px",marginBottom:10,border:"1px solid #E8E2DA",display:"flex",gap:12,alignItems:"flex-start"}}>
            <div style={{width:38,height:38,background:"#F2EFE9",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:18}}>{f.e}</div>
            <div>
              <div style={{fontSize:13,fontWeight:700,color:"#1C1917",marginBottom:4}}>{f.t}</div>
              <div style={{fontSize:12,color:"#78716C",lineHeight:1.65}}>{f.s}</div>
            </div>
          </div>
        ))}
        <div style={{marginTop:4,marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:700,color:"#78716C",marginBottom:8,letterSpacing:"0.04em"}}>ノートのイメージ</div>
          <div style={{background:"#FFFFFF",borderRadius:14,padding:"14px 16px",border:"1px solid #E8E2DA",opacity:0.5,filter:"blur(1.5px)",pointerEvents:"none",userSelect:"none"}}>
            <div style={{display:"flex",gap:5,marginBottom:8}}>
              <span style={{background:"#FDF3EA",color:"#C2621C",borderRadius:5,padding:"2px 7px",fontSize:10,fontWeight:700}}>面談</span>
              <span style={{fontSize:10,color:"#C4B9B0",marginLeft:"auto"}}>3月20日</span>
            </div>
            <div style={{fontSize:14,fontWeight:700,color:"#1C1917",marginBottom:6}}>初回面談まとめ</div>
            <div style={{background:"#F2EFE9",borderRadius:8,padding:"10px 12px",marginBottom:8,borderLeft:"3px solid #1C1917"}}>
              <div style={{fontSize:10,color:"#C4B9B0",marginBottom:3}}>仲介担当者より</div>
              <div style={{fontSize:12,color:"#1C1917",lineHeight:1.65}}>お二人の優先順位が「資産性＞エリア＞広さ」で揃っていたのが印象的でした。</div>
            </div>
            <div style={{display:"flex",gap:5}}>
              {["👍","💡","🙏"].map(e=><span key={e} style={{background:"#F2EFE9",borderRadius:20,padding:"3px 8px",fontSize:12}}>{e}</span>)}
            </div>
          </div>
        </div>
        <div style={{background:"#FDF3EA",borderRadius:16,padding:"18px",border:"1px solid rgba(194,98,28,0.27)",textAlign:"center"}}>
          <div style={{fontSize:14,fontWeight:800,color:"#1C1917",marginBottom:6}}>仲介担当者と連携すると<br/>ノート機能が使えます</div>
          <div style={{fontSize:12,color:"#78716C",marginBottom:14}}>連携コードを入力するだけで繋がります</div>
          <button onClick={onLinkAgent} style={{width:"100%",background:"#C2621C",color:"#FFFFFF",border:"none",borderRadius:12,padding:"14px 28px",fontSize:15,fontWeight:700,cursor:"pointer",fontFamily:"inherit"}}>
            仲介担当者と連携する →
          </button>
        </div>
      </div>
    </div>
  );

  // ─── 連携済み：ノート詳細 ───────────────────────────
  if (noteOpen) return (
    <div style={{flex:1,display:"flex",flexDirection:"column",minHeight:0}}>
      <div style={{background:"#FFFFFF",borderBottom:"1px solid #E8E2DA",padding:"10px 14px",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        <button onClick={()=>setNoteOpen(null)} style={{background:"#F2EFE9",border:"none",width:30,height:30,borderRadius:8,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,color:"#1C1917"}}>←</button>
        <div style={{flex:1}}>
          <div style={{fontSize:13,fontWeight:700,color:"#1C1917"}}>{noteOpen.title}</div>
          <div style={{fontSize:10,color:"#C4B9B0"}}>{noteOpen.date}</div>
        </div>
        <span style={{background:"#FDF3EA",color:"#C2621C",borderRadius:5,padding:"2px 7px",fontSize:10,fontWeight:700}}>
          {noteOpen.type==="meeting"?"面談":"内見"}
        </span>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
        <div style={{background:"#FFFFFF",borderRadius:14,padding:"16px",marginBottom:12,border:"1px solid #E8E2DA"}}>
          <div style={{display:"flex",gap:0}}>
            <div style={{width:3,background:"#1C1917",borderRadius:2,marginRight:12,flexShrink:0,alignSelf:"stretch"}}/>
            <div>
              <div style={{fontSize:10,color:"#C4B9B0",marginBottom:5}}>仲介担当者より</div>
              <div style={{fontSize:13,color:"#1C1917",lineHeight:1.85}}>{noteOpen.agentWords}</div>
            </div>
          </div>
        </div>
        {noteOpen.decided?.length>0&&(
          <div style={{background:"#EAF4EF",borderRadius:12,padding:"12px 14px",marginBottom:10,border:"1px solid rgba(45,106,79,0.13)"}}>
            <div style={{fontSize:10,fontWeight:700,color:"#2D6A4F",marginBottom:7}}>✓ 決まったこと</div>
            {noteOpen.decided.map((d,i)=>(
              <div key={i} style={{display:"flex",gap:6,padding:"5px 0",borderBottom:i<noteOpen.decided.length-1?"1px solid rgba(45,106,79,0.13)":"none"}}>
                <span style={{color:"#2D6A4F",fontSize:12}}>✓</span>
                <span style={{fontSize:13,color:"#1C1917",lineHeight:1.5}}>{d}</span>
              </div>
            ))}
          </div>
        )}
        {noteOpen.homework?.length>0&&(
          <div style={{background:"#FDF3EA",borderRadius:12,padding:"12px 14px",marginBottom:14,border:"1px solid rgba(194,98,28,0.2)"}}>
            <div style={{fontSize:10,fontWeight:700,color:"#C2621C",marginBottom:7}}>! 宿題・確認事項</div>
            {noteOpen.homework.map((h,i)=>(
              <div key={i} style={{display:"flex",gap:6,padding:"5px 0",borderBottom:i<noteOpen.homework.length-1?"1px solid rgba(194,98,28,0.13)":"none"}}>
                <span style={{color:"#C2621C",fontSize:12}}>→</span>
                <span style={{fontSize:13,color:"#1C1917",lineHeight:1.5}}>{h}</span>
              </div>
            ))}
          </div>
        )}
        <div style={{background:"#FFFFFF",borderRadius:12,padding:"12px 14px",marginBottom:12,border:"1px solid #E8E2DA"}}>
          <div style={{fontSize:10,fontWeight:600,color:"#C4B9B0",marginBottom:8}}>リアクション</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {(noteOpen.reactions.length>0?noteOpen.reactions:[{e:"👍",n:0,mine:false},{e:"❤️",n:0,mine:false},{e:"💡",n:0,mine:false}]).map(r=>(
              <button key={r.e} style={{background:r.mine?"#1C1917":"#FFFFFF",color:r.mine?"#FFFFFF":"#1C1917",border:`1px solid ${r.mine?"#1C1917":"#E8E2DA"}`,borderRadius:20,padding:"5px 11px",fontSize:14,cursor:"pointer",display:"flex",alignItems:"center",gap:3,fontFamily:"inherit"}}>
                {r.e}{r.n>0&&<span style={{fontSize:11,fontWeight:700}}>{r.n}</span>}
              </button>
            ))}
            <button onClick={()=>setPicker(!picker)} style={{background:"#F2EFE9",border:"none",borderRadius:20,padding:"5px 10px",fontSize:14,cursor:"pointer"}}>{picker?"×":"＋"}</button>
          </div>
          {picker&&(
            <div style={{display:"flex",gap:5,marginTop:8,flexWrap:"wrap"}}>
              {["👍","❤️","💡","🤔","🙏","😊","🎉","🔥"].map(e=>(
                <button key={e} onClick={()=>setPicker(false)} style={{background:"#FFFFFF",border:"1px solid #E8E2DA",borderRadius:8,padding:"5px 7px",fontSize:17,cursor:"pointer",fontFamily:"inherit"}}>{e}</button>
              ))}
            </div>
          )}
        </div>
        <div style={{marginBottom:70}}>
          <div style={{fontSize:10,fontWeight:600,color:"#C4B9B0",marginBottom:10}}>コメント {noteOpen.comments.length>0&&`(${noteOpen.comments.length})`}</div>
          {noteOpen.comments.length===0&&<div style={{textAlign:"center",padding:"16px",color:"#C4B9B0",fontSize:12}}>💬 コメントを送ってみましょう</div>}
          {noteOpen.comments.map((c,i)=>(
            <div key={i} style={{display:"flex",gap:8,marginBottom:10,flexDirection:c.agent?"row":"row-reverse"}}>
              <div style={{width:27,height:27,borderRadius:8,background:c.agent?"#1C1917":"#F2EFE9",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11}}>{c.agent?"🧑‍💼":"👤"}</div>
              <div style={{maxWidth:"76%",display:"flex",flexDirection:"column",alignItems:c.agent?"flex-start":"flex-end"}}>
                <div style={{fontSize:9,color:"#C4B9B0",marginBottom:2}}>{c.agent?"仲介担当者":"匿名"}</div>
                <div style={{background:c.agent?"#F2EFE9":"#1C1917",color:c.agent?"#1C1917":"#FFFFFF",borderRadius:c.agent?"4px 13px 13px 13px":"13px 4px 13px 13px",padding:"9px 12px",fontSize:12,lineHeight:1.65}}>{c.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:"#FFFFFF",borderTop:"1px solid #E8E2DA",padding:"8px 12px 16px",flexShrink:0}}>
        <div style={{display:"flex",gap:7,alignItems:"flex-end"}}>
          <div style={{width:27,height:27,background:"#F2EFE9",borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:11}}>👤</div>
          <div style={{flex:1,background:"#F2EFE9",borderRadius:10,border:"1px solid #E8E2DA",padding:"7px 11px"}}>
            <textarea value={comment} onChange={e=>setComment(e.target.value)} placeholder="匿名でコメントする…" rows={1}
              style={{width:"100%",background:"transparent",border:"none",outline:"none",resize:"none",fontSize:12,color:"#1C1917",fontFamily:"inherit",lineHeight:1.5}}/>
          </div>
          <button onClick={()=>setComment("")} disabled={!comment.trim()} style={{width:30,height:30,background:comment.trim()?"#1C1917":"#E8E2DA",border:"none",borderRadius:8,cursor:comment.trim()?"pointer":"default",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{color:"#FFFFFF",fontSize:12}}>↑</span>
          </button>
        </div>
      </div>
    </div>
  );

  // ─── 連携済み：ノート一覧 ───────────────────────────
  return (
    <div style={{flex:1,overflowY:"auto",background:"#FAF8F4"}}>
      <div style={{background:"#FFFFFF",padding:"14px 16px 12px",borderBottom:"1px solid #E8E2DA"}}>
        <div style={{fontSize:18,fontWeight:800,color:"#1C1917",marginBottom:3}}>✉️ ノート</div>
        <div style={{fontSize:12,color:"#78716C"}}>
          {unread>0&&<span style={{color:"#B91C1C",fontWeight:600}}>{unread}件の未読。</span>}
          リアクションやコメントができます。
        </div>
      </div>
      <div style={{padding:"12px 16px",display:"flex",flexDirection:"column",gap:9}}>
        {[...notes].reverse().map(note=>(
          <button key={note.id} onClick={()=>openNote(note)}
            style={{width:"100%",background:"#FFFFFF",border:`1px solid ${note.unread?"#C4B9B0":"#E8E2DA"}`,borderRadius:16,padding:"14px",textAlign:"left",cursor:"pointer",position:"relative",fontFamily:"inherit"}}>
            {note.unread&&<div style={{position:"absolute",top:12,right:12,width:7,height:7,background:"#B91C1C",borderRadius:"50%"}}/>}
            <div style={{display:"flex",gap:5,marginBottom:8}}>
              <span style={{background:"#FDF3EA",color:"#C2621C",borderRadius:5,padding:"2px 7px",fontSize:10,fontWeight:700}}>{note.type==="meeting"?"面談":"内見"}</span>
              <span style={{background:"#F2EFE9",color:"#C4B9B0",borderRadius:5,padding:"2px 7px",fontSize:10}}>STEP {note.step}</span>
              <span style={{fontSize:10,color:"#C4B9B0",marginLeft:"auto"}}>{note.date}</span>
            </div>
            <div style={{fontSize:15,fontWeight:700,color:"#1C1917",marginBottom:5,paddingRight:16}}>{note.title}</div>
            <div style={{fontSize:12,color:"#78716C",lineHeight:1.55}}>{note.agentWords.slice(0,50)}…</div>
            <div style={{display:"flex",gap:5,marginTop:9}}>
              {note.reactions.filter(r=>r.n>0).map(r=>(
                <span key={r.e} style={{background:r.mine?"#1C1917":"#F2EFE9",color:r.mine?"#FFFFFF":"#1C1917",borderRadius:20,padding:"2px 8px",fontSize:12}}>{r.e} {r.n}</span>
              ))}
              {note.comments.length>0&&<span style={{background:"#F2EFE9",borderRadius:20,padding:"2px 8px",fontSize:11,color:"#78716C"}}>💬 {note.comments.length}</span>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ════════════════════════════════════════════════════════
// 診断タブ
// ════════════════════════════════════════════════════════
const QUIZZES = [
  {id:"conditions",e:"🏠",t:"条件診断",   s:"2人で答えて意見の差分を確認",color:T.blue,  bg:T.blueBg,
   qs:[{e:"📍",q:"理想のエリアは？",opts:["都心（山手線圏内）","準都心","郊外でもOK","こだわらない"]},
       {e:"📐",q:"広さへのこだわりは？",opts:["コンパクト（〜50㎡）","普通（50〜70㎡）","広め（70㎡以上）","こだわらない"]},
       {e:"📈",q:"資産性の重視度は？",opts:["最重視（住み替え前提）","重視する","ある程度","気にしない"]}]},
  {id:"budget",    e:"💰",t:"予算診断",   s:"年収・家族構成から予算を算出",color:T.green, bg:T.greenBg,
   qs:[{e:"💼",q:"本人の年収は？",opts:["300万円未満","300〜500万円","500〜800万円","800万円以上"]},
       {e:"🏡",q:"いまの家賃は？",opts:["〜8万円","8〜13万円","13〜18万円","18万円以上"]},
       {e:"💰",q:"使える自己資金は？",opts:["〜200万円","200〜500万円","500〜1,000万円","1,000万円以上"]}]},
  {id:"loan",      e:"🏦",t:"ローン性格診断",s:"固定か変動か性格から診断",color:T.purple,bg:T.purpleBg,
   qs:[{e:"⚖️",q:"リスクへのスタンスは？",opts:["安心重視（固定向き）","バランス重視","コスト重視（変動向き）"]},
       {e:"📅",q:"保有期間の予定は？",opts:["〜10年（住み替え前提）","10〜20年","20年以上"]},
       {e:"📈",q:"将来の収入見通しは？",opts:["上がりそう","ほぼ変わらない","一時的に下がる可能性あり"]}]},
  {id:"type",      e:"🏢",t:"住まいタイプ診断",s:"マンションか戸建てか",color:T.amber, bg:T.amberBg,
   qs:[{e:"🌆",q:"理想の暮らしは？",opts:["都心でコンパクトに","郊外でゆったり","どちらでも"]},
       {e:"📈",q:"資産性への考えは？",opts:["流動性（売りやすさ）重視","土地を持ちたい","どちらでも"]},
       {e:"🔧",q:"維持管理の手間は？",opts:["管理組合に任せたい","自分でカスタマイズ","どちらでも"]}]},
];

function QuizTab() {
  const [quizId,   setQuizId]   = useState(null);
  const [qIdx,     setQIdx]     = useState(0);
  const [ans,      setAns]      = useState({});
  const [done,     setDone]     = useState(false);
  const [subTab,   setSubTab]   = useState("menu"); // menu | history
  const [saved,    setSaved]    = useState(false);
  const [history,  setHistory]  = useState(() => {
    try { return JSON.parse(localStorage.getItem("ielogi_quiz_history")||"[]"); } catch { return []; }
  });

  const saveResult = (quizId, summary, detail) => {
    const entry = {id:`${quizId}_${Date.now()}`,quizId,summary,detail,date:new Date().toLocaleDateString("ja-JP",{month:"numeric",day:"numeric"}),ts:Date.now()};
    const updated = [entry,...history].slice(0,20);
    setHistory(updated);
    try { localStorage.setItem("ielogi_quiz_history", JSON.stringify(updated)); } catch {}
    setSaved(true);
    setTimeout(()=>setSaved(false),2000);
  };

  const QDATA = quizId ? QUIZZES.find(q=>q.id===quizId) : null;
  const QQ    = QDATA ? QDATA.qs[qIdx] : null;

  if (!quizId) return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:T.paper}}>
      {/* ヘッダー＋タブ */}
      <div style={{background:T.white,borderBottom:`1px solid ${T.line}`,flexShrink:0}}>
        <div style={{padding:"14px 16px 0"}}>
          <div style={{fontSize:18,fontWeight:800,color:T.ink,marginBottom:12}}>✨ 診断</div>
          <div style={{display:"flex",gap:0}}>
            {[{id:"menu",l:"診断を受ける"},{id:"history",l:`履歴${history.length>0?" ("+history.length+")":""}`}].map(t=>(
              <button key={t.id} onClick={()=>setSubTab(t.id)} style={{flex:1,background:"none",border:"none",cursor:"pointer",padding:"8px 0 12px",fontSize:12,fontWeight:subTab===t.id?700:400,color:subTab===t.id?T.ink:T.inkLight,borderBottom:`2px solid ${subTab===t.id?T.amber:"transparent"}`,fontFamily:"inherit"}}>
                {t.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {subTab==="menu" && (
        <div style={{flex:1,overflowY:"auto",padding:"12px 16px"}}>
          <div style={{fontSize:12,color:T.inkLight,marginBottom:12}}>4つの診断で家選びの判断軸を整理しましょう。結果は保存できます。</div>
          <div style={{display:"flex",flexDirection:"column",gap:9}}>
            {QUIZZES.map(q=>{
              const latest = history.filter(h=>h.quizId===q.id)[0];
              return (
                <button key={q.id} onClick={()=>{setQuizId(q.id);setQIdx(0);setAns({});setDone(false);}}
                  style={{background:T.white,border:`1px solid ${T.line}`,borderRadius:16,padding:"16px",textAlign:"left",cursor:"pointer",display:"flex",alignItems:"center",gap:12,fontFamily:"inherit"}}>
                  <div style={{width:44,height:44,background:q.bg,borderRadius:13,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:22}}>{q.e}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:14,fontWeight:700,color:T.ink,marginBottom:2}}>{q.t}</div>
                    {latest
                      ? <div style={{fontSize:11,color:T.green,fontWeight:600}}>✓ {latest.summary} · {latest.date}</div>
                      : <div style={{fontSize:11,color:T.inkLight}}>{q.s}</div>
                    }
                  </div>
                  <span style={{fontSize:18,color:T.inkFaint}}>›</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {subTab==="history" && (
        <div style={{flex:1,overflowY:"auto",padding:"12px 16px"}}>
          {history.length===0 ? (
            <div style={{textAlign:"center",padding:"48px 20px"}}>
              <div style={{fontSize:32,marginBottom:10}}>📭</div>
              <div style={{fontSize:14,fontWeight:700,color:T.ink,marginBottom:6}}>まだ保存した診断がありません</div>
              <div style={{fontSize:12,color:T.inkLight}}>診断後に「保存する」ボタンを押すと、ここに履歴が残ります</div>
            </div>
          ) : (
            <div style={{display:"flex",flexDirection:"column",gap:9}}>
              {history.map(h=>{
                const q = QUIZZES.find(q=>q.id===h.quizId);
                return (
                  <div key={h.id} style={{background:T.white,border:`1px solid ${T.line}`,borderRadius:14,padding:"14px 16px",display:"flex",gap:10,alignItems:"center"}}>
                    <div style={{width:38,height:38,background:q?.bg||T.paperDim,borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,fontSize:18}}>{q?.e}</div>
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,color:T.inkLight,marginBottom:2}}>{q?.t}</div>
                      <div style={{fontSize:13,fontWeight:700,color:T.ink}}>{h.summary}</div>
                      <div style={{fontSize:10,color:T.inkFaint,marginTop:2}}>{h.date}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );

  const resultSummary = QDATA && done ? (
    QDATA.id==="conditions" ? "エリア重視・コンパクト派" :
    QDATA.id==="budget"     ? "推奨予算：4,500〜5,500万円" :
    QDATA.id==="loan"       ? "変動金利タイプ 🚀" :
    "マンション向きタイプ 🏢"
  ) : "";

  if (done) return (
    <div style={{flex:1,overflowY:"auto",padding:"16px",background:T.paper}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16}}>
        <button onClick={()=>setQuizId(null)} style={{background:T.paperDim,border:"none",width:28,height:28,borderRadius:7,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:T.ink}}>←</button>
        <span style={{flex:1,fontSize:14,fontWeight:700,color:T.ink}}>{QDATA.e} {QDATA.t}の結果</span>
      </div>
      <div style={{background:QDATA.bg,borderRadius:18,padding:"24px",marginBottom:12,textAlign:"center",border:`1px solid ${QDATA.color}22`}}>
        <div style={{fontSize:36,marginBottom:10}}>{QDATA.e}</div>
        <div style={{fontSize:17,fontWeight:800,color:T.ink}}>{resultSummary}</div>
      </div>
      <Card style={{marginBottom:12,overflow:"hidden"}}>
        {QDATA.qs.map((q,i)=>(
          <div key={i} style={{padding:"10px 14px",borderBottom:i<QDATA.qs.length-1?`1px solid ${T.line}`:"none"}}>
            <div style={{fontSize:10,color:T.inkFaint,marginBottom:2}}>{q.e} {q.q}</div>
            <div style={{fontSize:13,fontWeight:600,color:T.ink}}>{q.opts[ans[i]??0]}</div>
          </div>
        ))}
      </Card>
      <div style={{background:T.amberBg,borderRadius:12,padding:"12px 14px",marginBottom:14,border:`1px solid ${T.amber}33`}}>
        <div style={{fontSize:11,fontWeight:700,color:T.amber,marginBottom:4}}>💡 面談のたたき台に</div>
        <div style={{fontSize:12,color:T.ink,lineHeight:1.7}}>この診断結果を仲介担当者との面談前に見せることで、話し合いがスムーズになります。</div>
      </div>

      {/* 保存ボタン */}
      {saved ? (
        <div style={{background:T.greenBg,borderRadius:12,padding:"12px 14px",marginBottom:10,textAlign:"center",border:`1px solid ${T.green}22`}}>
          <span style={{fontSize:13,fontWeight:700,color:T.green}}>✓ 履歴に保存しました</span>
        </div>
      ) : (
        <Btn v="amber" full style={{marginBottom:10}} onClick={()=>saveResult(
          QDATA.id, resultSummary,
          QDATA.qs.map((q,i)=>({q:q.q,a:q.opts[ans[i]??0]}))
        )}>💾 この結果を保存する</Btn>
      )}
      <Btn v="outline" full onClick={()=>setQuizId(null)}>診断トップに戻る</Btn>
    </div>
  );

  return (
    <div style={{flex:1,display:"flex",flexDirection:"column",padding:"16px",background:T.paper}}>
      <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:14}}>
        <button onClick={()=>qIdx===0?setQuizId(null):setQIdx(qIdx-1)} style={{background:T.paperDim,border:"none",width:28,height:28,borderRadius:7,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:T.ink}}>←</button>
        <span style={{flex:1,fontSize:13,fontWeight:700,color:T.ink}}>{QDATA.e} {QDATA.t}</span>
        <span style={{fontSize:11,color:T.inkFaint}}>{qIdx+1}/{QDATA.qs.length}</span>
      </div>
      <div style={{height:3,background:T.line,borderRadius:2,overflow:"hidden",marginBottom:24}}>
        <div style={{width:`${((qIdx+1)/QDATA.qs.length)*100}%`,height:"100%",background:QDATA.color,borderRadius:2,transition:"width 0.3s"}}/>
      </div>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontSize:36,marginBottom:10}}>{QQ.e}</div>
        <div style={{fontSize:20,fontWeight:800,color:T.ink,lineHeight:1.4,letterSpacing:"-0.02em"}}>{QQ.q}</div>
      </div>
      <div style={{flex:1,display:"flex",flexDirection:"column",gap:8}}>
        {QQ.opts.map((opt,i)=>(
          <button key={i} onClick={()=>setAns(p=>({...p,[qIdx]:i}))} style={{
            background:ans[qIdx]===i?T.ink:T.white,
            border:`1px solid ${ans[qIdx]===i?T.ink:T.line}`,
            borderRadius:14,padding:"14px 16px",textAlign:"left",cursor:"pointer",
            fontSize:14,fontWeight:ans[qIdx]===i?600:400,color:ans[qIdx]===i?T.white:T.ink,
            lineHeight:1.4,transition:"all 0.15s",fontFamily:"inherit",
          }}>{opt}</button>
        ))}
      </div>
      <button disabled={ans[qIdx]===undefined} onClick={()=>qIdx<QDATA.qs.length-1?setQIdx(qIdx+1):setDone(true)} style={{
        marginTop:16,width:"100%",background:ans[qIdx]!==undefined?QDATA.color:T.line,
        color:T.white,border:"none",borderRadius:14,padding:"15px",
        fontSize:15,fontWeight:700,cursor:ans[qIdx]!==undefined?"pointer":"default",
        transition:"all 0.2s",fontFamily:"inherit",
      }}>
        {qIdx<QDATA.qs.length-1?"次へ →":"結果を見る →"}
      </button>
    </div>
  );
}

// ════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════
// 設定タブ
// ════════════════════════════════════════════════════════
function SettingsTab() {
  const [page, setPage] = useState(null); // null | faq | terms | privacy

  const FAQS = [
    {q:"ielogiは無料で使えますか？",a:"はい、顧客アプリは完全無料でご利用いただけます。"},
    {q:"仲介担当者と繋がらないと使えませんか？",a:"いいえ、診断やステップガイドはエージェントなしで単体でご利用いただけます。仲介担当者と連携するとノート機能が使えるようになります。"},
    {q:"診断結果はどこに保存されますか？",a:"診断結果はお使いのデバイスに保存されます。アプリを削除すると消えます。"},
    {q:"パートナーと情報を共有するには？",a:"右上の👫アイコンから招待コードを発行してパートナーに送るか、パートナーからもらったコードを入力してください。"},
    {q:"連携コードはどこで発行しますか？",a:"担当の仲介担当者にアプリ管理画面から発行してもらいます。コードは6桁の英数字です。"},
    {q:"アカウントの削除はできますか？",a:"設定画面のアカウント管理から削除できます。削除後はデータを復元することができません。"},
  ];

  if (page==="faq") return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:T.paper}}>
      <div style={{background:T.white,padding:"12px 16px",borderBottom:`1px solid ${T.line}`,display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        <button onClick={()=>setPage(null)} style={{background:T.paperDim,border:"none",width:28,height:28,borderRadius:7,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:T.ink}}>←</button>
        <span style={{fontSize:15,fontWeight:700,color:T.ink}}>よくある質問</span>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"16px"}}>
        {FAQS.map((f,i)=>(
          <div key={i} style={{background:T.white,borderRadius:14,padding:"14px 16px",marginBottom:10,border:`1px solid ${T.line}`}}>
            <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:7}}>Q. {f.q}</div>
            <div style={{fontSize:12,color:T.inkLight,lineHeight:1.7}}>A. {f.a}</div>
          </div>
        ))}
      </div>
    </div>
  );

  if (page==="terms" || page==="privacy") return (
    <div style={{flex:1,display:"flex",flexDirection:"column",background:T.paper}}>
      <div style={{background:T.white,padding:"12px 16px",borderBottom:`1px solid ${T.line}`,display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        <button onClick={()=>setPage(null)} style={{background:T.paperDim,border:"none",width:28,height:28,borderRadius:7,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,color:T.ink}}>←</button>
        <span style={{fontSize:15,fontWeight:700,color:T.ink}}>{page==="terms"?"利用規約":"プライバシーポリシー"}</span>
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"20px 16px"}}>
        <div style={{background:T.white,borderRadius:14,padding:"16px",border:`1px solid ${T.line}`}}>
          {page==="terms" ? (
            <div style={{fontSize:12,color:T.inkLight,lineHeight:1.9}}>
              <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:10}}>ielogi 利用規約</div>
              <p style={{marginBottom:10}}>本利用規約（以下「本規約」）は、ielogiが提供するサービス（以下「本サービス」）の利用条件を定めるものです。</p>
              <div style={{fontWeight:700,color:T.ink,marginTop:14,marginBottom:6}}>第1条（適用）</div>
              <p>本規約は、ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されます。</p>
              <div style={{fontWeight:700,color:T.ink,marginTop:14,marginBottom:6}}>第2条（禁止事項）</div>
              <p>ユーザーは、本サービスの利用にあたり、不正アクセス、他者への迷惑行為、その他法令に違反する行為を行ってはなりません。</p>
              <div style={{fontWeight:700,color:T.ink,marginTop:14,marginBottom:6}}>第3条（免責事項）</div>
              <p>当社は、本サービスに事実上または法律上の瑕疵がないことを保証しません。本サービスに起因してユーザーに生じた損害について、当社の故意または重過失による場合を除き、責任を負いません。</p>
            </div>
          ) : (
            <div style={{fontSize:12,color:T.inkLight,lineHeight:1.9}}>
              <div style={{fontSize:13,fontWeight:700,color:T.ink,marginBottom:10}}>プライバシーポリシー</div>
              <p style={{marginBottom:10}}>ielogiは、ユーザーの個人情報の取扱いについて、以下のとおり定めます。</p>
              <div style={{fontWeight:700,color:T.ink,marginTop:14,marginBottom:6}}>取得する情報</div>
              <p>メールアドレス（認証用）、診断回答データ（条件・予算等）、ステップ進捗データ</p>
              <div style={{fontWeight:700,color:T.ink,marginTop:14,marginBottom:6}}>取得しない情報</div>
              <p>位置情報、連絡先、写真・カメラ</p>
              <div style={{fontWeight:700,color:T.ink,marginTop:14,marginBottom:6}}>第三者提供</div>
              <p>連携した仲介担当者のみ（診断結果・ステップ）、Stripe（決済・仲介担当者側のみ）、Firebase/Google（インフラ）</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const SECTIONS = [
    {
      items:[
        {icon:"👤", label:"プロフィール編集",    action:()=>{}},
        {icon:"🔔", label:"通知設定",           action:()=>{}},
        {icon:"👫", label:"パートナー連携",      action:()=>{}},
        {icon:"🔗", label:"仲介担当者と連携",    action:()=>{}},
      ]
    },
    {
      items:[
        {icon:"❓", label:"よくある質問",         action:()=>setPage("faq")},
        {icon:"✉️", label:"お問い合わせ",        action:()=>{}},
        {icon:"⭐", label:"レビューを書く",       action:()=>{}},
        {icon:"📣", label:"友達に紹介する",       action:()=>{}},
      ]
    },
    {
      items:[
        {icon:"📄", label:"利用規約",            action:()=>setPage("terms")},
        {icon:"🔒", label:"プライバシーポリシー", action:()=>setPage("privacy")},
        {icon:"📱", label:"アプリバージョン",    value:"1.0.0", action:null},
      ]
    },
    {
      items:[
        {icon:"🚪", label:"ログアウト",          color:T.red, action:()=>{}},
      ]
    },
  ];

  return (
    <div style={{flex:1,overflowY:"auto",background:T.paperDim}}>
      {/* ヘッダー */}
      <div style={{background:T.white,padding:"14px 16px 16px",borderBottom:`1px solid ${T.line}`}}>
        <div style={{fontSize:18,fontWeight:800,color:T.ink,marginBottom:10}}>⚙️ 設定</div>
        {/* アカウント情報 */}
        <div style={{display:"flex",alignItems:"center",gap:12}}>
          <div style={{width:52,height:52,background:T.ink,borderRadius:16,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <span style={{fontSize:24,fontWeight:700,color:T.white}}>さ</span>
          </div>
          <div>
            <div style={{fontSize:15,fontWeight:700,color:T.ink}}>山田 さくら</div>
            <div style={{fontSize:12,color:T.inkLight}}>sakura@example.com</div>
          </div>
        </div>
      </div>

      {/* 設定リスト */}
      <div style={{padding:"16px"}}>
        {SECTIONS.map((section,si)=>(
          <div key={si} style={{background:T.white,borderRadius:16,overflow:"hidden",marginBottom:12,border:`1px solid ${T.line}`}}>
            {section.items.map((item,ii)=>(
              <button key={item.label} onClick={item.action||undefined} disabled={!item.action}
                style={{width:"100%",background:"none",border:"none",borderBottom:ii<section.items.length-1?`1px solid ${T.line}`:"none",padding:"13px 16px",display:"flex",alignItems:"center",gap:12,cursor:item.action?"pointer":"default",fontFamily:"inherit",textAlign:"left"}}>
                <span style={{fontSize:18,width:24,textAlign:"center",flexShrink:0}}>{item.icon}</span>
                <span style={{flex:1,fontSize:14,fontWeight:500,color:item.color||T.ink}}>{item.label}</span>
                {item.value
                  ? <span style={{fontSize:12,color:T.inkFaint}}>{item.value}</span>
                  : item.action && <span style={{fontSize:16,color:T.inkFaint}}>›</span>
                }
              </button>
            ))}
          </div>
        ))}

        <div style={{textAlign:"center",marginTop:8,marginBottom:16}}>
          <div style={{fontSize:11,color:T.inkFaint}}>ielogi v1.0.0</div>
          <div style={{fontSize:10,color:T.inkFaint,marginTop:2}}>© 2026 ielogi</div>
        </div>
      </div>
    </div>
  );
}

// ROOT APP
// ════════════════════════════════════════════════════════
export default function App() {
  const [screen,     setScreen]     = useState("onboarding");
  const [tab,        setTab]        = useState("home");
  const [noteOpen,   setNoteOpen]   = useState(null);
  const [hasAgent,   setHasAgent]   = useState(false);
  const [hasPartner, setHasPartner] = useState(false);
  const [showAgentModal,   setShowAgentModal]   = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);
  const [agentCode,   setAgentCode]   = useState("");
  const [partnerCode, setPartnerCode] = useState("");
  const [agentLinked,   setAgentLinked]   = useState(false);
  const [partnerLinked, setPartnerLinked] = useState(false);

  const [checkedTasks, setCheckedTasks] = useState({
    "1-0":true,"1-1":true,"1-2":true,
    "2-0":true,"2-1":true,"2-2":true,
    "3-0":true,"3-1":true,"3-2":true,
    "4-0":true,
  });

  const currentStep = 4;
  const unread = SAMPLE_NOTES.filter(n=>n.unread).length;
  const {condTags, fin} = deriveHomeData(checkedTasks);

  // ─── 仲介担当者連携モーダル ─────────────────────────
  const AgentModal = () => (
    <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",alignItems:"flex-end",borderRadius:46}}>
      <div style={{background:T.white,borderRadius:"24px 24px 0 0",padding:"24px 20px 36px",width:"100%"}} className="slide">
        <div style={{width:36,height:4,background:T.line,borderRadius:2,margin:"0 auto 20px"}}/>
        <div style={{fontSize:18,fontWeight:800,color:T.ink,marginBottom:4}}>仲介担当者と連携する</div>
        <div style={{fontSize:12,color:T.inkLight,marginBottom:20,lineHeight:1.7}}>
          担当者から受け取った6桁の連携コードを入力してください。<br/>コードは担当者のアプリ管理画面から発行できます。
        </div>
        <div style={{marginBottom:16}}>
          <label style={{fontSize:11,fontWeight:700,color:T.inkLight,display:"block",marginBottom:6}}>連携コード（6桁）</label>
          <input value={agentCode} onChange={e=>setAgentCode(e.target.value.toUpperCase().slice(0,6))}
            placeholder="例：A3F9K2" maxLength={6}
            style={{width:"100%",padding:"12px 16px",borderRadius:12,border:`1.5px solid ${agentCode.length===6?T.ink:T.line}`,fontSize:22,fontWeight:700,color:T.ink,letterSpacing:"0.15em",textAlign:"center",outline:"none",fontFamily:"inherit"}}/>
        </div>
        {agentLinked ? (
          <div style={{background:T.greenBg,borderRadius:12,padding:"14px",textAlign:"center",marginBottom:14,border:`1px solid ${T.green}22`}}>
            <div style={{fontSize:20,marginBottom:4}}>🎉</div>
            <div style={{fontSize:14,fontWeight:700,color:T.green}}>連携が完了しました！</div>
            <div style={{fontSize:12,color:T.inkLight,marginTop:2}}>ノート機能が使えるようになりました</div>
          </div>
        ) : (
          <button disabled={agentCode.length!==6} onClick={()=>setAgentLinked(true)} style={{width:"100%",background:agentCode.length===6?T.amber:T.line,color:T.white,border:"none",borderRadius:12,padding:"14px",fontSize:15,fontWeight:700,cursor:agentCode.length===6?"pointer":"default",fontFamily:"inherit",transition:"all 0.2s"}}>
            連携する
          </button>
        )}
        <button onClick={()=>{setShowAgentModal(false);if(agentLinked){setHasAgent(true);setAgentLinked(false);setAgentCode("");}}} style={{width:"100%",background:"none",border:"none",padding:"12px",fontSize:13,color:T.inkLight,cursor:"pointer",fontFamily:"inherit",marginTop:4}}>
          {agentLinked?"閉じる":"キャンセル"}
        </button>
      </div>
    </div>
  );

  // ─── パートナー連携モーダル ─────────────────────────
  const PartnerModal = () => {
    const [mode, setMode] = useState("menu"); // menu | invite | enter
    const [myCode] = useState("P7KQ34");
    const [enterCode, setEnterCode] = useState("");
    return (
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)",zIndex:100,display:"flex",alignItems:"flex-end",borderRadius:46}}>
        <div style={{background:T.white,borderRadius:"24px 24px 0 0",padding:"24px 20px 36px",width:"100%"}} className="slide">
          <div style={{width:36,height:4,background:T.line,borderRadius:2,margin:"0 auto 20px"}}/>
          <div style={{fontSize:18,fontWeight:800,color:T.ink,marginBottom:4}}>パートナーと連携する</div>
          <div style={{fontSize:12,color:T.inkLight,marginBottom:20,lineHeight:1.7}}>
            夫婦・カップルで同じ情報を共有できます。<br/>診断結果や条件の差分を2人で確認できます。
          </div>

          {mode==="menu" && (
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <button onClick={()=>setMode("invite")} style={{background:T.ink,color:T.white,border:"none",borderRadius:14,padding:"16px",cursor:"pointer",textAlign:"left",display:"flex",gap:12,alignItems:"center",fontFamily:"inherit"}}>
                <span style={{fontSize:24}}>📤</span>
                <div>
                  <div style={{fontSize:14,fontWeight:700}}>招待コードを発行する</div>
                  <div style={{fontSize:12,color:"rgba(255,255,255,0.55)",marginTop:2}}>パートナーに送って繋がる</div>
                </div>
              </button>
              <button onClick={()=>setMode("enter")} style={{background:T.white,color:T.ink,border:`1px solid ${T.line}`,borderRadius:14,padding:"16px",cursor:"pointer",textAlign:"left",display:"flex",gap:12,alignItems:"center",fontFamily:"inherit"}}>
                <span style={{fontSize:24}}>📥</span>
                <div>
                  <div style={{fontSize:14,fontWeight:700,color:T.ink}}>招待コードを入力する</div>
                  <div style={{fontSize:12,color:T.inkLight,marginTop:2}}>パートナーから受け取ったコードを入力</div>
                </div>
              </button>
            </div>
          )}

          {mode==="invite" && (
            <div>
              <div style={{background:T.paperDim,borderRadius:14,padding:"20px",textAlign:"center",marginBottom:16}}>
                <div style={{fontSize:11,color:T.inkLight,marginBottom:6}}>あなたの招待コード</div>
                <div style={{fontSize:36,fontWeight:900,color:T.ink,letterSpacing:"0.12em",marginBottom:10}}>{myCode}</div>
                <div style={{fontSize:11,color:T.inkFaint}}>有効期限：24時間</div>
              </div>
              <button style={{width:"100%",background:T.amber,color:T.white,border:"none",borderRadius:12,padding:"13px",fontSize:14,fontWeight:700,cursor:"pointer",fontFamily:"inherit",marginBottom:10}}>
                🔗 コードをコピーしてLINEで送る
              </button>
              <button onClick={()=>setMode("menu")} style={{width:"100%",background:"none",border:"none",padding:"10px",fontSize:13,color:T.inkLight,cursor:"pointer",fontFamily:"inherit"}}>← 戻る</button>
            </div>
          )}

          {mode==="enter" && (
            <div>
              <div style={{marginBottom:16}}>
                <label style={{fontSize:11,fontWeight:700,color:T.inkLight,display:"block",marginBottom:6}}>招待コード（6桁）</label>
                <input value={enterCode} onChange={e=>setEnterCode(e.target.value.toUpperCase().slice(0,6))}
                  placeholder="例：P7KQ34" maxLength={6}
                  style={{width:"100%",padding:"12px 16px",borderRadius:12,border:`1.5px solid ${enterCode.length===6?T.ink:T.line}`,fontSize:22,fontWeight:700,color:T.ink,letterSpacing:"0.15em",textAlign:"center",outline:"none",fontFamily:"inherit"}}/>
              </div>
              {partnerLinked ? (
                <div style={{background:T.greenBg,borderRadius:12,padding:"14px",textAlign:"center",marginBottom:14,border:`1px solid ${T.green}22`}}>
                  <div style={{fontSize:20,marginBottom:4}}>💑</div>
                  <div style={{fontSize:14,fontWeight:700,color:T.green}}>パートナーと繋がりました！</div>
                  <div style={{fontSize:12,color:T.inkLight,marginTop:2}}>診断・条件を2人で共有できます</div>
                </div>
              ) : (
                <button disabled={enterCode.length!==6} onClick={()=>setPartnerLinked(true)} style={{width:"100%",background:enterCode.length===6?T.ink:T.line,color:T.white,border:"none",borderRadius:12,padding:"14px",fontSize:15,fontWeight:700,cursor:enterCode.length===6?"pointer":"default",fontFamily:"inherit",marginBottom:10}}>
                  連携する
                </button>
              )}
              <button onClick={()=>setMode("menu")} style={{width:"100%",background:"none",border:"none",padding:"10px",fontSize:13,color:T.inkLight,cursor:"pointer",fontFamily:"inherit"}}>← 戻る</button>
            </div>
          )}

          {!partnerLinked && mode!=="invite" && (
            <button onClick={()=>{setShowPartnerModal(false);if(partnerLinked){setHasPartner(true);setPartnerLinked(false);}}} style={{width:"100%",background:"none",border:"none",padding:"10px",fontSize:13,color:T.inkLight,cursor:"pointer",fontFamily:"inherit",marginTop:4}}>
              キャンセル
            </button>
          )}
          {partnerLinked && (
            <button onClick={()=>{setShowPartnerModal(false);setHasPartner(true);setPartnerLinked(false);}} style={{width:"100%",background:"none",border:"none",padding:"10px",fontSize:13,color:T.inkLight,cursor:"pointer",fontFamily:"inherit",marginTop:4}}>
              閉じる
            </button>
          )}
        </div>
      </div>
    );
  };

  // ボトムナビ（ノートは常時表示）
  const BottomNav = () => {
    const items = [
      {id:"home",     e:"🏠", l:"ホーム"},
      {id:"steps",    e:"📋", l:"ステップ"},
      {id:"notes",    e:"✉️", l:"ノート", badge:hasAgent?unread:0},
      {id:"quiz",     e:"✨", l:"診断"},
      {id:"settings", e:"⚙️", l:"設定"},
    ];
    return (
      <div style={{height:72,background:T.white,borderTop:`1px solid ${T.line}`,display:"flex",alignItems:"center",justifyContent:"space-around",paddingBottom:6,flexShrink:0}}>
        {items.map(item=>{
          const active = tab===item.id;
          return (
            <button key={item.id} onClick={()=>{setTab(item.id);setNoteOpen(null);}}
              style={{background:"none",border:"none",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,padding:"4px 12px",position:"relative"}}>
              {item.badge>0&&<div style={{position:"absolute",top:2,right:8,width:8,height:8,background:T.red,borderRadius:"50%"}}/>}
              <span style={{fontSize:19,opacity:active?1:0.35,lineHeight:1}}>{item.e}</span>
              <span style={{fontSize:9,fontWeight:active?700:400,color:active?T.ink:T.inkLight}}>{item.l}</span>
              <div style={{width:3,height:3,borderRadius:"50%",background:active?T.amber:"transparent"}}/>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div style={{minHeight:"100vh",background:"#111110",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"20px 16px",fontFamily:"'M PLUS Rounded 1c',sans-serif"}}>
      <GS/>

      {/* 画面切り替えボタン（デモ用） */}
      <div style={{marginBottom:12,display:"flex",gap:6,alignItems:"center",flexWrap:"wrap",justifyContent:"center"}}>
        <span style={{fontSize:10,color:"rgba(255,255,255,0.3)"}}>画面：</span>
        {[
          {id:"onboarding",l:"オンボーディング"},
          {id:"home",       l:"ホーム"},
          {id:"steps",      l:"ステップ"},
          {id:"quiz",       l:"診断"},
          {id:"notes",      l:"ノート"},
          {id:"settings",   l:"設定"},
        ].map(s=>(
          <button key={s.id} onClick={()=>{setScreen(s.id==="onboarding"?"onboarding":"app");setTab(s.id==="onboarding"?"home":s.id);}} style={{
            background:screen===(s.id==="onboarding"?"onboarding":"app")&&tab===s.id&&screen!=="onboarding"||screen==="onboarding"&&s.id==="onboarding"?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.1)",
            color:screen===(s.id==="onboarding"?"onboarding":"app")&&tab===s.id&&screen!=="onboarding"||screen==="onboarding"&&s.id==="onboarding"?"#111":"rgba(255,255,255,0.4)",
            border:"none",borderRadius:20,padding:"4px 12px",fontSize:11,fontWeight:600,cursor:"pointer",fontFamily:"inherit",
          }}>{s.l}</button>
        ))}
        <div style={{width:1,height:16,background:"rgba(255,255,255,0.15)"}}/>
        <button onClick={()=>setHasAgent(!hasAgent)} style={{background:hasAgent?"rgba(194,98,28,0.8)":"rgba(255,255,255,0.1)",color:T.white,border:"none",borderRadius:20,padding:"4px 12px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>
          {hasAgent?"✓ 仲介担当者連携中":"仲介担当者未連携"}
        </button>
        <button onClick={()=>setHasPartner(!hasPartner)} style={{background:hasPartner?"rgba(45,106,79,0.8)":"rgba(255,255,255,0.1)",color:T.white,border:"none",borderRadius:20,padding:"4px 12px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>
          {hasPartner?"✓ パートナー連携中":"パートナー未連携"}
        </button>
      </div>

      {/* iPhoneフレーム */}
      <div style={{width:390,height:812,background:T.paper,borderRadius:46,overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 48px 100px rgba(0,0,0,0.6),0 0 0 1px rgba(255,255,255,0.05)",fontFamily:"'M PLUS Rounded 1c',sans-serif",position:"relative"}}>

        {/* モーダル */}
        {showAgentModal   && <AgentModal/>}
        {showPartnerModal && <PartnerModal/>}

        {/* ステータスバー */}
        <div style={{height:50,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 22px 0",flexShrink:0,background:screen==="onboarding"?T.paper:T.white}}>
          <span style={{fontSize:14,fontWeight:700,color:T.ink}}>9:41</span>
          <div style={{width:120,height:28,background:"#111",borderRadius:20,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <div style={{width:10,height:10,background:"#333",borderRadius:"50%",marginRight:6}}/>
            <div style={{width:60,height:4,background:"#333",borderRadius:2}}/>
          </div>
          {/* パートナー連携アイコン（ホーム以外も常時表示） */}
          {screen!=="onboarding" && (
            <button onClick={()=>setShowPartnerModal(true)} style={{background:"none",border:"none",cursor:"pointer",display:"flex",alignItems:"center",gap:4,padding:0}}>
              <div style={{width:26,height:26,background:hasPartner?T.greenBg:T.paperDim,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",border:`1px solid ${hasPartner?T.green+"44":T.line}`}}>
                <span style={{fontSize:13}}>👫</span>
              </div>
            </button>
          )}
          {screen==="onboarding" && <span style={{fontSize:11,color:T.inkLight}}>●●●</span>}
        </div>

        {/* コンテンツ */}
        {screen==="onboarding" ? (
          <Onboarding onDone={()=>{setScreen("app");setTab("home");}}/>
        ) : (
          <>
            <div style={{flex:1,overflowY:"hidden",display:"flex",flexDirection:"column",minHeight:0}}>
              {tab==="home"     && <HomeTab currentStep={currentStep} hasAgent={hasAgent} setTab={setTab} setNoteOpen={setNoteOpen} condTags={condTags} fin={fin}/>}
              {tab==="steps"    && <StepsTab currentStep={currentStep} checked={checkedTasks} setChk={setCheckedTasks}/>}
              {tab==="notes"    && <NotesTab noteOpen={noteOpen} setNoteOpen={setNoteOpen} hasAgent={hasAgent} onLinkAgent={()=>setShowAgentModal(true)}/>}
              {tab==="quiz"     && <QuizTab/>}
              {tab==="settings" && <SettingsTab/>}
            </div>
            <BottomNav/>
          </>
        )}
      </div>

      <div style={{marginTop:12,fontSize:10,color:"rgba(255,255,255,0.2)",textAlign:"center",lineHeight:1.9}}>
        タスクをチェックするとホームの条件・予算が更新されます ·「解説」で5W1H詳細<br/>
        診断結果は「保存する」で履歴タブに保存 · 設定タブから利用規約・FAQ等
      </div>
    </div>
  );
}
