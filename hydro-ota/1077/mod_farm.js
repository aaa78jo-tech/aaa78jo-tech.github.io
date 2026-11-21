/* ===== Farm tools v1 (v8.0): irrigation-water acid calculator (HCO3), harvest / cost / profit ledger, settings (text size, backup export / import).
   Lazy module, ES5, 8 languages. ===== */
(function(){
"use strict";
if(window.__farmInit)return; window.__farmInit=1;
var L=function(){return document.documentElement.getAttribute("lang")||"en";};
var T=function(o){return (o&&(o[L()]||o.en))||"";};
function M(ar,en,fr,es,zh,hi,pt,nl){return {ar:ar,en:en,fr:fr,es:es,zh:zh,hi:hi,pt:pt,nl:nl};}
function el(t,a,x){var e=document.createElement(t);if(a)for(var k in a)e.setAttribute(k,a[k]);if(x!=null)e.textContent=x;return e;}
function ls(k,d){try{var v=localStorage.getItem(k);return v?JSON.parse(v):d;}catch(_){return d;}}
function lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true;}catch(_){return false;}}
function track(n,o){try{if(window.AndroidBridge&&AndroidBridge.track)AndroidBridge.track(n,JSON.stringify(o||{}));}catch(_){}}
function toast(m){try{window.__toast&&window.__toast(m);}catch(_){}}
function br(){return window.AndroidBridge||null;}
function n(v){v=parseFloat(String(v==null?"":v).replace(",","."));return isFinite(v)?v:null;}
function r(v,d){var p=Math.pow(10,d==null?1:d);return Math.round(v*p)/p;}
function bdi(x){return el("bdi",{dir:"ltr"},String(x));}
function today(){var d=new Date();return d.getFullYear()+"-"+("0"+(d.getMonth()+1)).slice(-2)+"-"+("0"+d.getDate()).slice(-2);}
function fmtN(v,d){try{return Number(r(v,d==null?2:d)).toLocaleString(L()==="ar"?"en":(L()==="zh"?"zh-CN":L()));}catch(_){return String(r(v,2));}}

var S={
 /* AdMob earnings (developer only, v8.4). Arabic + English; other languages fall back to English. */
 amT:M("💰 أرباح AdMob","💰 AdMob earnings"),
 amLoading:M("💰 … جارٍ تحميل الأرباح","💰 … loading earnings"),
 amTotal:M("💰 مجموع الأرباح الكامل","💰 Total earnings (all time)"),
 amSince:M("منذ","since"),
 amImp:M("ظهور","impressions"),
 amClk:M("نقرة","clicks"),
 amToday:M("اليوم","Today"),
 amYday:M("أمس","Yesterday"),
 am7:M("7 أيام","7 days"),
 am30:M("30 يوماً","30 days"),
 amEcpm:M("eCPM (7 أيام): {v} لكل 1000 ظهور · نسبة التعبئة: {f}% · نقرات: {c}","eCPM (7 days): {v} per 1000 impressions · fill rate: {f}% · clicks: {c}"),
 amFmtT:M("النوع (7 أيام)","Type (7 days)"),
 amEarn:M("الأرباح","Earnings"),
 amImpH:M("ظهور","Impr."),
 amMonthly:M("🗓️ شهرياً (كل الفترة)","🗓️ Monthly (all time)"),
 amDaily:M("📅 يومياً (30 يوماً)","📅 Daily (30 days)"),
 amMonth:M("الشهر","Month"),
 amDay:M("اليوم","Day"),
 amSum:M("المجموع","Total"),
 amFoot:M("أرباح تقديرية من AdMob (قد تتأخر بضع ساعات).","Estimated earnings from AdMob (can lag a few hours)."),
 amEdit:M("تعديل الربط","Edit link"),
 amRefresh:M("↻ تحديث","↻ Refresh"),
 amScopeApp:M("هذا التطبيق","This app"),
 amScopeAll:M("كل تطبيقاتي","All my apps"),
 amUpdated:M("آخر تحديث: {t}","Updated: {t}"),
 amChart:M("الأرباح اليومية — آخر 30 يوماً","Daily earnings — last 30 days"),
 amAnaT:M("🔎 التحليل","🔎 Analysis"),
 amTrendUp:M("▲ آخر 7 أيام {a} مقابل {b} في الأسبوع السابق (+{p}%).","▲ Last 7 days {a} vs {b} the week before (+{p}%)."),
 amTrendDn:M("▼ آخر 7 أيام {a} مقابل {b} في الأسبوع السابق (−{p}%).","▼ Last 7 days {a} vs {b} the week before (−{p}%)."),
 amTrendNew:M("آخر 7 أيام {a} — لا توجد أرباح في الأسبوع السابق للمقارنة.","Last 7 days {a} — no earnings the week before to compare."),
 amAvg:M("متوسط يومي {a} · تقدير 30 يوماً بهذا المعدل ≈ {b}.","Daily average {a} · 30-day estimate at this rate ≈ {b}."),
 amBest:M("أفضل يوم خلال 30 يوماً: {d} ({a}).","Best day in 30 days: {d} ({a})."),
 amFmtShare:M("«{f}» يحقق {e}% من الأرباح بـ {i}% من الظهور.","\"{f}\" makes {e}% of earnings from {i}% of impressions."),
 amCtr:M("نسبة النقر {c}%.","Click-through rate {c}%."),
 amCtrHigh:M("⚠️ نسبة النقر مرتفعة ({c}%): النقرات غير المقصودة قد تؤدي إلى تقييد عرض الإعلانات — أبعد البانر عن الأزرار.","⚠️ High click-through rate ({c}%): accidental clicks can trigger ad-serving limits — keep the banner away from buttons."),
 amFillLow:M("⚠️ نسبة التعبئة منخفضة ({f}%): كثير من الطلبات لا يُعرض لها إعلان. راجع في AdMob حالة التطبيق وحدود عرض الإعلانات (Ad serving limits).","⚠️ Low fill rate ({f}%): many requests get no ad. Check the app status and ad-serving limits in AdMob."),
 amArpdau:M("ربح كل 1000 زيارة يومية (7 أيام): {a} — من {u} زيارة (مستخدمو v8.3+ فقط).","Earnings per 1000 daily visits (7 days): {a} — from {u} visits (v8.3+ users only)."),
 amNoData:M("لا توجد أرباح مسجّلة بعد لهذا النطاق.","No earnings recorded yet for this scope."),
 amSetT:M("💰 ربط أرباح AdMob (مرة واحدة)","💰 Link AdMob earnings (once)"),
 amSetNote:M("الصق القيم الثلاث نفسها المستخدمة في تطبيق «تحدى دانيال» (حساب AdMob واحد)، أو أنشئها بالخطوات أدناه. تُحفظ على هذا الجهاز فقط — لا تُرفع مع المزامنة ولا مع النسخة الاحتياطية — وتُرسل عبر اتصال مشفّر إلى خادمك على Cloudflare الذي يطلب التقرير من Google ولا يخزّنها.","Paste the same three values used in the Daniel Quiz app (one AdMob account), or create them with the steps below. They stay on this device only — never synced or included in backups — and go over an encrypted connection to your Cloudflare Worker, which asks Google for the report and stores nothing."),
 amHow:M("كيف أحصل عليها؟ (مجاناً)","How do I get them? (free)"),
 amSteps:M("1) console.cloud.google.com ← اختر مشروعاً ← APIs & Services ← Library ← فعّل «AdMob API».\n2) OAuth consent screen: النوع External، أضف بريد حساب AdMob كمستخدم اختبار، ثم «Publish app» (In production) حتى لا تنتهي صلاحية الرمز بعد 7 أيام.\n3) Credentials ← Create credentials ← OAuth client ID ← Web application، وفي Authorized redirect URIs ضع: https://developers.google.com/oauthplayground\n4) افتح developers.google.com/oauthplayground ← ⚙️ ← Use your own OAuth credentials ← الصق Client ID و Client secret ← في خانة Step 1 اكتب https://www.googleapis.com/auth/admob.readonly ← Authorize APIs بحساب AdMob ← Exchange authorization code for tokens ← انسخ Refresh token.","1) console.cloud.google.com → pick a project → APIs & Services → Library → enable \"AdMob API\".\n2) OAuth consent screen: External, add the AdMob account email as a test user, then \"Publish app\" (In production) so the token does not expire after 7 days.\n3) Credentials → Create credentials → OAuth client ID → Web application, with Authorized redirect URI: https://developers.google.com/oauthplayground\n4) Open developers.google.com/oauthplayground → ⚙️ → Use your own OAuth credentials → paste Client ID and Client secret → in Step 1 type https://www.googleapis.com/auth/admob.readonly → Authorize APIs with the AdMob account → Exchange authorization code for tokens → copy the Refresh token."),
 amSave:M("💾 حفظ وتحميل الأرباح","💾 Save and load earnings"),
 amCancel:M("إلغاء","Cancel"),
 amNeed:M("املأ الحقول الثلاثة","Fill in all three fields"),
 amErr:M("تعذّر جلب الأرباح: ","Couldn't load earnings: "),
 amErrWorker:M("الخادم لا يعرف هذا الطلب بعد — انشر worker.js (v4) على Cloudflare ثم أعد المحاولة.","The server doesn't know this request yet — deploy worker.js (v4) to Cloudflare and retry."),
 amErrNet:M("لا اتصال بالخادم. تحقق من الإنترنت.","Can't reach the server. Check the internet connection."),
 amErrToken:M("رمز الربط مرفوض أو منتهي — أنشئ Refresh token جديداً ثم «تعديل الربط».","The link token was refused or expired — create a new refresh token, then \"Edit link\"."),
 /* VPD + DLI (v8.4) */
 clT:M("🌡️ حاسبة VPD و DLI","🌡️ VPD & DLI calculator","🌡️ Calculateur VPD & DLI","🌡️ Calculadora VPD y DLI","🌡️ VPD 与 DLI 计算器","🌡️ VPD व DLI कैलकुलेटर","🌡️ Calculadora VPD e DLI","🌡️ VPD- & DLI-calculator"),
 clSub:M("مناخ الزراعة الداخلية والبيوت المحمية: عجز ضغط البخار (VPD) وكمية الضوء اليومية (DLI). يعمل دون إنترنت.","Indoor & greenhouse climate: vapour-pressure deficit (VPD) and daily light integral (DLI). Works offline.","Climat en intérieur et en serre : déficit de pression de vapeur (VPD) et intégrale lumineuse quotidienne (DLI). Fonctionne hors ligne.","Clima en interior e invernadero: déficit de presión de vapor (VPD) e integral de luz diaria (DLI). Funciona sin conexión.","室内与温室气候：饱和水汽压差（VPD）和日累积光照（DLI）。可离线使用。","इनडोर व ग्रीनहाउस जलवायु: वाष्प दाब घाटा (VPD) और दैनिक प्रकाश समाकलन (DLI)। ऑफ़लाइन काम करता है।","Clima interno e em estufa: déficit de pressão de vapor (VPD) e integral de luz diária (DLI). Funciona offline.","Binnen- en kasklimaat: dampdrukdeficit (VPD) en dagelijkse lichtsom (DLI). Werkt offline."),
 vpdH:M("💧 VPD — عجز ضغط البخار","💧 VPD — vapour-pressure deficit","💧 VPD — déficit de pression de vapeur","💧 VPD — déficit de presión de vapor","💧 VPD — 饱和水汽压差","💧 VPD — वाष्प दाब घाटा","💧 VPD — déficit de pressão de vapor","💧 VPD — dampdrukdeficit"),
 vpdWhat:M("يقيس قوة سحب الهواء للماء من الورقة؛ يجمع الحرارة والرطوبة في رقم واحد يتحكم في النتح وامتصاص الكالسيوم وخطر الأمراض.","How strongly the air pulls water from the leaf. It combines temperature and humidity into one number that drives transpiration, calcium uptake and disease risk.","Mesure la force avec laquelle l'air tire l'eau des feuilles ; il combine température et humidité et pilote la transpiration, l'absorption du calcium et le risque de maladies.","Mide cuánto tira el aire del agua de la hoja; combina temperatura y humedad y controla la transpiración, la absorción de calcio y el riesgo de enfermedades.","衡量空气从叶片带走水分的强度；它把温度和湿度合成一个数值，决定蒸腾、钙吸收和病害风险。","हवा पत्ती से पानी कितनी ज़ोर से खींचती है; यह तापमान और नमी को एक संख्या में जोड़ता है जो वाष्पोत्सर्जन, कैल्शियम अवशोषण और रोग जोखिम तय करती है।","Mede a força com que o ar puxa água da folha; combina temperatura e umidade e controla a transpiração, a absorção de cálcio e o risco de doenças.","Hoe sterk de lucht water uit het blad trekt; combineert temperatuur en luchtvochtigheid tot één getal dat verdamping, calciumopname en ziekterisico bepaalt."),
 unitT:M("وحدة الحرارة","Temperature unit","Unité de température","Unidad de temperatura","温度单位","तापमान इकाई","Unidade de temperatura","Temperatuureenheid"),
 tAir:M("حرارة الهواء","Air temperature","Température de l'air","Temperatura del aire","空气温度","हवा का तापमान","Temperatura do ar","Luchttemperatuur"),
 rh:M("الرطوبة النسبية (%)","Relative humidity (%)","Humidité relative (%)","Humedad relativa (%)","相对湿度 (%)","सापेक्ष आर्द्रता (%)","Umidade relativa (%)","Relatieve luchtvochtigheid (%)"),
 leafOff:M("الورقة أبرد من الهواء بمقدار","Leaf cooler than air by","Feuille plus froide que l'air de","Hoja más fría que el aire en","叶片比空气低","पत्ती हवा से इतनी ठंडी","Folha mais fria que o ar em","Blad kouder dan lucht met"),
 leafHint:M("عادةً 1–3 °C تحت إضاءة LED و0–1 تحت HPS أو الشمس. اتركها 2 إن لم تقِسها.","Usually 1–3 °C under LED, 0–1 under HPS or sun. Leave 2 if you don't measure it.","En général 1–3 °C sous LED, 0–1 sous HPS ou au soleil. Laissez 2 si vous ne la mesurez pas.","Normalmente 1–3 °C con LED y 0–1 con HPS o sol. Deja 2 si no la mides.","LED 下通常低 1–3 °C，HPS 或日光下低 0–1 °C。未测量可保持 2。","LED में आमतौर पर 1–3 °C, HPS या धूप में 0–1। न मापें तो 2 रहने दें।","Normalmente 1–3 °C com LED e 0–1 com HPS ou sol. Deixe 2 se não medir.","Meestal 1–3 °C onder LED, 0–1 onder HPS of zon. Laat 2 staan als je het niet meet."),
 stage:M("مرحلة النمو","Growth stage","Stade de croissance","Etapa de crecimiento","生长阶段","विकास चरण","Estágio de crescimento","Groeifase"),
 stProp:M("شتلات وعُقَل (0.4–0.8 kPa)","Seedlings & cuttings (0.4–0.8 kPa)","Semis & boutures (0,4–0,8 kPa)","Plántulas y esquejes (0,4–0,8 kPa)","幼苗与扦插 (0.4–0.8 kPa)","पौध व कलम (0.4–0.8 kPa)","Mudas e estacas (0,4–0,8 kPa)","Zaailingen & stekken (0,4–0,8 kPa)"),
 stVeg:M("نمو خضري (0.8–1.2 kPa)","Vegetative (0.8–1.2 kPa)","Croissance végétative (0,8–1,2 kPa)","Vegetativo (0,8–1,2 kPa)","营养生长 (0.8–1.2 kPa)","वानस्पतिक वृद्धि (0.8–1.2 kPa)","Vegetativo (0,8–1,2 kPa)","Vegetatief (0,8–1,2 kPa)"),
 stFlower:M("إزهار وإثمار (1.2–1.6 kPa)","Flowering & fruiting (1.2–1.6 kPa)","Floraison & fructification (1,2–1,6 kPa)","Floración y fructificación (1,2–1,6 kPa)","开花结果 (1.2–1.6 kPa)","फूल व फल (1.2–1.6 kPa)","Floração e frutificação (1,2–1,6 kPa)","Bloei & vruchtzetting (1,2–1,6 kPa)"),
 vOk:M("✓ مثالي لهذه المرحلة.","✓ Ideal for this stage.","✓ Idéal pour ce stade.","✓ Ideal para esta etapa.","✓ 适合此阶段。","✓ इस चरण के लिए आदर्श।","✓ Ideal para este estágio.","✓ Ideaal voor deze fase."),
 vLow:M("أقل من المناسب لهذه المرحلة: خفّض الرطوبة أو ارفع الحرارة قليلاً.","Below the range for this stage: lower the humidity or raise the temperature slightly.","Sous la plage de ce stade : baissez l'humidité ou montez un peu la température.","Por debajo del rango de esta etapa: baja la humedad o sube un poco la temperatura.","低于此阶段范围：降低湿度或略微提高温度。","इस चरण की सीमा से कम: नमी घटाएँ या तापमान थोड़ा बढ़ाएँ।","Abaixo da faixa deste estágio: reduza a umidade ou aumente um pouco a temperatura.","Onder het bereik voor deze fase: verlaag de luchtvochtigheid of verhoog de temperatuur iets."),
 vHigh:M("أعلى من المناسب لهذه المرحلة: ارفع الرطوبة أو خفّض الحرارة.","Above the range for this stage: raise the humidity or lower the temperature.","Au-dessus de la plage de ce stade : augmentez l'humidité ou baissez la température.","Por encima del rango de esta etapa: sube la humedad o baja la temperatura.","高于此阶段范围：提高湿度或降低温度。","इस चरण की सीमा से अधिक: नमी बढ़ाएँ या तापमान घटाएँ।","Acima da faixa deste estágio: aumente a umidade ou reduza a temperatura.","Boven het bereik voor deze fase: verhoog de luchtvochtigheid of verlaag de temperatuur."),
 vLowD:M("⚠️ منخفض جداً: هواء شبه مشبع — نتح ضعيف ونقص كالسيوم (احتراق الأطراف) وخطر عفن وفطريات.","⚠️ Very low: near-saturated air — weak transpiration, calcium deficiency (tipburn) and mould risk.","⚠️ Très bas : air presque saturé — transpiration faible, carence en calcium (nécrose marginale) et risque de moisissures.","⚠️ Muy bajo: aire casi saturado — transpiración débil, carencia de calcio (quemado de puntas) y riesgo de moho.","⚠️ 过低：空气接近饱和——蒸腾弱、缺钙（叶缘焦枯）且易发霉。","⚠️ बहुत कम: हवा लगभग संतृप्त — कमज़ोर वाष्पोत्सर्जन, कैल्शियम कमी (टिपबर्न) और फफूंद का खतरा।","⚠️ Muito baixo: ar quase saturado — transpiração fraca, deficiência de cálcio (queima das bordas) e risco de mofo.","⚠️ Zeer laag: bijna verzadigde lucht — zwakke verdamping, calciumgebrek (randjes) en schimmelrisico."),
 vHighD:M("⚠️ مرتفع جداً: هواء جاف — إجهاد وذبول وإغلاق الثغور وتوقف النمو.","⚠️ Very high: dry air — stress, wilting, closed stomata and stalled growth.","⚠️ Très élevé : air sec — stress, flétrissement, stomates fermés et croissance bloquée.","⚠️ Muy alto: aire seco — estrés, marchitez, estomas cerrados y crecimiento detenido.","⚠️ 过高：空气干燥——胁迫、萎蔫、气孔关闭、生长停滞。","⚠️ बहुत अधिक: सूखी हवा — तनाव, मुरझाना, रंध्र बंद और वृद्धि रुकना।","⚠️ Muito alto: ar seco — estresse, murcha, estômatos fechados e crescimento parado.","⚠️ Zeer hoog: droge lucht — stress, verwelking, gesloten huidmondjes en groeistilstand."),
 rhAdv:M("الرطوبة المناسبة عند هذه الحرارة: {a}–{b}%","Right humidity at this temperature: {a}–{b}%","Humidité adaptée à cette température : {a}–{b} %","Humedad adecuada a esta temperatura: {a}–{b} %","此温度下的适宜湿度：{a}–{b}%","इस तापमान पर सही नमी: {a}–{b}%","Umidade adequada nesta temperatura: {a}–{b}%","Juiste luchtvochtigheid bij deze temperatuur: {a}–{b}%"),
 rhNA:M("لا يمكن بلوغ المدى المناسب بالرطوبة وحدها عند هذه الحرارة — عدّل الحرارة.","Humidity alone can't reach the range at this temperature — adjust the temperature.","L'humidité seule ne permet pas d'atteindre la plage à cette température — ajustez la température.","Solo con la humedad no se alcanza el rango a esta temperatura — ajusta la temperatura.","在此温度下仅靠湿度无法达到范围——请调整温度。","इस तापमान पर केवल नमी से सीमा तक नहीं पहुँचा जा सकता — तापमान बदलें।","Só com a umidade não se alcança a faixa nesta temperatura — ajuste a temperatura.","Met alleen luchtvochtigheid haal je het bereik niet bij deze temperatuur — pas de temperatuur aan."),
 rhTbl:M("الرطوبة المناسبة حسب الحرارة (للمرحلة المختارة)","Right humidity by temperature (selected stage)","Humidité adaptée selon la température (stade choisi)","Humedad adecuada según la temperatura (etapa elegida)","不同温度下的适宜湿度（所选阶段）","तापमान के अनुसार सही नमी (चुना गया चरण)","Umidade adequada por temperatura (estágio escolhido)","Juiste luchtvochtigheid per temperatuur (gekozen fase)"),
 leafT:M("حرارة الورقة","Leaf temperature","Température de la feuille","Temperatura de la hoja","叶片温度","पत्ती का तापमान","Temperatura da folha","Bladtemperatuur"),
 dliH:M("☀️ DLI — كمية الضوء اليومية","☀️ DLI — daily light integral","☀️ DLI — intégrale lumineuse quotidienne","☀️ DLI — integral de luz diaria","☀️ DLI — 日累积光照","☀️ DLI — दैनिक प्रकाश समाकलन","☀️ DLI — integral de luz diária","☀️ DLI — dagelijkse lichtsom"),
 dliWhat:M("مجموع الضوء المفيد الذي يصل للنبات في اليوم = شدة الإضاءة × عدد الساعات.","Total useful light the plant receives in a day = light intensity × hours.","Lumière utile totale reçue par jour = intensité × heures.","Luz útil total que recibe la planta al día = intensidad × horas.","植物每天获得的有效光总量 = 光强 × 小时数。","पौधे को दिन भर में मिलने वाली कुल उपयोगी रोशनी = तीव्रता × घंटे।","Luz útil total recebida por dia = intensidade × horas.","Totale bruikbare lichthoeveelheid per dag = lichtintensiteit × uren."),
 meas:M("طريقة القياس","Measured as","Mesure","Medición","测量方式","माप का प्रकार","Medição","Gemeten als"),
 mPpfd:M("PPFD (ميكرومول/م²/ث)","PPFD (µmol/m²/s)","PPFD (µmol/m²/s)","PPFD (µmol/m²/s)","PPFD (µmol/m²/s)","PPFD (µmol/m²/s)","PPFD (µmol/m²/s)","PPFD (µmol/m²/s)"),
 mLux:M("لوكس (جهاز أو تطبيق قياس)","Lux (meter or phone app)","Lux (luxmètre ou appli)","Lux (luxómetro o app)","勒克斯（照度计或手机应用）","लक्स (मीटर या फ़ोन ऐप)","Lux (luxímetro ou app)","Lux (luxmeter of app)"),
 src:M("مصدر الضوء","Light source","Source lumineuse","Fuente de luz","光源","प्रकाश स्रोत","Fonte de luz","Lichtbron"),
 lsSun:M("شمس","Sunlight","Soleil","Sol","日光","धूप","Sol","Zonlicht"),
 lsLed:M("LED أبيض (طيف كامل)","White LED (full spectrum)","LED blanche (spectre complet)","LED blanco (espectro completo)","白光 LED（全光谱）","सफ़ेद LED (फुल स्पेक्ट्रम)","LED branco (espectro completo)","Witte LED (volledig spectrum)"),
 lsHps:M("صوديوم عالي الضغط HPS","High-pressure sodium (HPS)","Sodium haute pression (HPS)","Sodio de alta presión (HPS)","高压钠灯 (HPS)","हाई-प्रेशर सोडियम (HPS)","Sódio de alta pressão (HPS)","Hogedruknatrium (HPS)"),
 lsFl:M("فلورسنت","Fluorescent","Fluorescent","Fluorescente","荧光灯","फ़्लोरोसेंट","Fluorescente","Tl-licht"),
 lsMh:M("ميتال هاليد MH","Metal halide (MH)","Halogénures métalliques (MH)","Halogenuros metálicos (MH)","金属卤化物灯 (MH)","मेटल हैलाइड (MH)","Vapor metálico (MH)","Metaalhalide (MH)"),
 valPpfd:M("PPFD عند مستوى الأوراق","PPFD at canopy level","PPFD au niveau du feuillage","PPFD a nivel de las hojas","冠层处 PPFD","पत्तियों के स्तर पर PPFD","PPFD no nível das folhas","PPFD op bladhoogte"),
 valLux:M("اللوكس عند مستوى الأوراق","Lux at canopy level","Lux au niveau du feuillage","Lux a nivel de las hojas","冠层处照度 (lux)","पत्तियों के स्तर पर लक्स","Lux no nível das folhas","Lux op bladhoogte"),
 hours:M("ساعات الإضاءة في اليوم","Light hours per day","Heures d'éclairage par jour","Horas de luz al día","每日光照小时数","प्रतिदिन रोशनी के घंटे","Horas de luz por dia","Lichturen per dag"),
 crMicro:M("مايكروغرين (6–12)","Microgreens (6–12)","Micro-pousses (6–12)","Microbrotes (6–12)","芽苗菜 (6–12)","माइक्रोग्रीन्स (6–12)","Microverdes (6–12)","Microgroenten (6–12)"),
 crSeed:M("شتلات (8–12)","Seedlings (8–12)","Semis (8–12)","Plántulas (8–12)","幼苗 (8–12)","पौध (8–12)","Mudas (8–12)","Zaailingen (8–12)"),
 crLeafy:M("خس وورقيات (12–17)","Lettuce & leafy greens (12–17)","Laitue & légumes-feuilles (12–17)","Lechuga y hojas verdes (12–17)","生菜与叶菜 (12–17)","लेट्यूस व पत्तेदार सब्ज़ियाँ (12–17)","Alface e folhosas (12–17)","Sla & bladgroenten (12–17)"),
 crHerb:M("أعشاب: ريحان ونعناع (12–18)","Herbs: basil, mint (12–18)","Aromates : basilic, menthe (12–18)","Aromáticas: albahaca, menta (12–18)","香草：罗勒、薄荷 (12–18)","जड़ी-बूटियाँ: तुलसी, पुदीना (12–18)","Ervas: manjericão, hortelã (12–18)","Kruiden: basilicum, munt (12–18)"),
 crStraw:M("فراولة (17–25)","Strawberry (17–25)","Fraise (17–25)","Fresa (17–25)","草莓 (17–25)","स्ट्रॉबेरी (17–25)","Morango (17–25)","Aardbei (17–25)"),
 crFruit:M("طماطم وفلفل وخيار (20–30)","Tomato, pepper, cucumber (20–30)","Tomate, poivron, concombre (20–30)","Tomate, pimiento, pepino (20–30)","番茄、辣椒、黄瓜 (20–30)","टमाटर, मिर्च, खीरा (20–30)","Tomate, pimentão, pepino (20–30)","Tomaat, paprika, komkommer (20–30)"),
 ppfdEq:M("≈ PPFD {v} ميكرومول/م²/ث","≈ PPFD {v} µmol/m²/s","≈ PPFD {v} µmol/m²/s","≈ PPFD {v} µmol/m²/s","≈ PPFD {v} µmol/m²/s","≈ PPFD {v} µmol/m²/s","≈ PPFD {v} µmol/m²/s","≈ PPFD {v} µmol/m²/s"),
 dOk:M("✓ ضمن المدى المناسب لهذا المحصول.","✓ Within the right range for this crop.","✓ Dans la bonne plage pour cette culture.","✓ Dentro del rango adecuado para este cultivo.","✓ 处于该作物的适宜范围。","✓ इस फसल के लिए सही सीमा में।","✓ Dentro da faixa certa para esta cultura.","✓ Binnen het juiste bereik voor dit gewas."),
 dLow:M("ضوء أقل من الحاجة. لبلوغ {t}: ارفع PPFD إلى {p} أو مدّد الإضاءة إلى {h} ساعة.","Not enough light. To reach {t}: raise PPFD to {p} or extend lighting to {h} h.","Lumière insuffisante. Pour atteindre {t} : montez le PPFD à {p} ou allongez l'éclairage à {h} h.","Luz insuficiente. Para llegar a {t}: sube el PPFD a {p} o alarga la iluminación a {h} h.","光照不足。要达到 {t}：将 PPFD 提高到 {p}，或把光照延长到 {h} 小时。","रोशनी कम है। {t} तक पहुँचने के लिए: PPFD {p} तक बढ़ाएँ या रोशनी {h} घंटे तक बढ़ाएँ।","Luz insuficiente. Para chegar a {t}: aumente o PPFD para {p} ou estenda a luz para {h} h.","Te weinig licht. Om {t} te halen: verhoog PPFD naar {p} of verleng de belichting tot {h} u."),
 dLowP:M("ضوء أقل من الحاجة. لبلوغ {t}: ارفع PPFD إلى {p}.","Not enough light. To reach {t}: raise PPFD to {p}.","Lumière insuffisante. Pour atteindre {t} : montez le PPFD à {p}.","Luz insuficiente. Para llegar a {t}: sube el PPFD a {p}.","光照不足。要达到 {t}：将 PPFD 提高到 {p}。","रोशनी कम है। {t} तक पहुँचने के लिए: PPFD {p} तक बढ़ाएँ।","Luz insuficiente. Para chegar a {t}: aumente o PPFD para {p}.","Te weinig licht. Om {t} te halen: verhoog PPFD naar {p}."),
 dHigh:M("ضوء أكثر من الحاجة (كهرباء مهدورة وإجهاد). لبلوغ {t}: خفّض PPFD إلى {p} أو قلّل الإضاءة إلى {h} ساعة.","More light than needed (wasted power and stress). To reach {t}: lower PPFD to {p} or cut lighting to {h} h.","Plus de lumière que nécessaire (énergie gaspillée, stress). Pour atteindre {t} : baissez le PPFD à {p} ou réduisez l'éclairage à {h} h.","Más luz de la necesaria (energía desperdiciada y estrés). Para llegar a {t}: baja el PPFD a {p} o reduce la iluminación a {h} h.","光照超出需要（浪费电并造成胁迫）。要达到 {t}：将 PPFD 降到 {p}，或把光照缩短到 {h} 小时。","ज़रूरत से ज़्यादा रोशनी (बिजली की बर्बादी व तनाव)। {t} के लिए: PPFD {p} तक घटाएँ या रोशनी {h} घंटे करें।","Mais luz do que o necessário (energia desperdiçada e estresse). Para chegar a {t}: reduza o PPFD para {p} ou a luz para {h} h.","Meer licht dan nodig (verspilde stroom en stress). Om {t} te halen: verlaag PPFD naar {p} of belicht {h} u."),
 tipburn:M("للخس: DLI فوق 17 يزيد خطر احتراق الأطراف (Tipburn) — حافظ على تهوية جيدة وVPD مناسب.","Lettuce: a DLI above 17 raises tipburn risk — keep good airflow and a proper VPD.","Laitue : un DLI au-delà de 17 augmente le risque de nécrose marginale — gardez une bonne ventilation et un VPD correct.","Lechuga: un DLI superior a 17 aumenta el riesgo de quemado de puntas — mantén buena ventilación y un VPD adecuado.","生菜：DLI 超过 17 会增加叶缘焦枯风险——保持良好通风和合适的 VPD。","लेट्यूस: 17 से अधिक DLI पर टिपबर्न का खतरा बढ़ता है — अच्छी हवा और सही VPD रखें।","Alface: DLI acima de 17 aumenta o risco de queima das bordas — mantenha boa ventilação e VPD adequado.","Sla: een DLI boven 17 verhoogt het risico op randjes — zorg voor goede luchtbeweging en een juiste VPD."),
 luxNote:M("التحويل من اللوكس تقريبي (±15–20%)؛ جهاز PAR أدق.","Lux conversion is approximate (±15–20%); a PAR meter is more accurate.","La conversion depuis les lux est approximative (±15–20 %) ; un capteur PAR est plus précis.","La conversión desde lux es aproximada (±15–20 %); un medidor PAR es más preciso.","由勒克斯换算为近似值（±15–20%）；PAR 计更准确。","लक्स से रूपांतरण अनुमानित है (±15–20%); PAR मीटर अधिक सटीक है।","A conversão de lux é aproximada (±15–20%); um medidor PAR é mais preciso.","Omrekening vanuit lux is bij benadering (±15–20%); een PAR-meter is nauwkeuriger."),
 rangesNote:M("القيم إرشادية من مراجع زراعية شائعة؛ راقب نباتاتك وعدّل تدريجياً.","Guideline values from common horticultural references; watch your plants and adjust gradually.","Valeurs indicatives issues de références horticoles courantes ; observez vos plantes et ajustez progressivement.","Valores orientativos de referencias hortícolas comunes; observa tus plantas y ajusta poco a poco.","数值为常见园艺参考的指导值；请观察植物并逐步调整。","मान आम बागवानी संदर्भों से दिशानिर्देश हैं; पौधों को देखें और धीरे-धीरे बदलें।","Valores de referência de fontes hortícolas comuns; observe suas plantas e ajuste aos poucos.","Richtwaarden uit gangbare tuinbouwbronnen; let op je planten en pas geleidelijk aan."),
 uPpfd:M("ميكرومول/م²/ث","µmol/m²/s","µmol/m²/s","µmol/m²/s","µmol/m²/s","µmol/m²/s","µmol/m²/s","µmol/m²/s"),
 unitDli:M("مول/م²/يوم","mol/m²/day","mol/m²/jour","mol/m²/día","mol/m²/天","mol/m²/दिन","mol/m²/dia","mol/m²/dag"),
 /* developer dashboard: returning users (v8.4) */
 adRet:M("عائدون اليوم","Returning today","Returning today","Returning today","Returning today","Returning today","Returning today","Returning today"),
 adRet7:M("نسبة العائدين (7 أيام)","Returning share (7 days)","Returning share (7 days)","Returning share (7 days)","Returning share (7 days)","Returning share (7 days)","Returning share (7 days)","Returning share (7 days)"),
 adDays3:M("آخر 14 يوماً (نشطون / جدد / عائدون)","Last 14 days (active / new / returning)","Last 14 days (active / new / returning)","Last 14 days (active / new / returning)","Last 14 days (active / new / returning)","Last 14 days (active / new / returning)","Last 14 days (active / new / returning)","Last 14 days (active / new / returning)"),
 adRetNote:M("العائد = نشط اليوم وليس جديداً. للاحتفاظ الدقيق D1/D7/D30 (مجاني): Firebase Console ← Analytics ← Dashboard ← بطاقة Retention، أو Play Console ← User acquisition ← Retained installers.","Returning = active today and not new. For exact D1/D7/D30 retention (free): Firebase Console → Analytics → Dashboard → Retention card, or Play Console → User acquisition → Retained installers.","Returning = active today and not new. For exact D1/D7/D30 retention (free): Firebase Console → Analytics → Dashboard → Retention card, or Play Console → User acquisition → Retained installers.","Returning = active today and not new. For exact D1/D7/D30 retention (free): Firebase Console → Analytics → Dashboard → Retention card, or Play Console → User acquisition → Retained installers.","Returning = active today and not new. For exact D1/D7/D30 retention (free): Firebase Console → Analytics → Dashboard → Retention card, or Play Console → User acquisition → Retained installers.","Returning = active today and not new. For exact D1/D7/D30 retention (free): Firebase Console → Analytics → Dashboard → Retention card, or Play Console → User acquisition → Retained installers.","Returning = active today and not new. For exact D1/D7/D30 retention (free): Firebase Console → Analytics → Dashboard → Retention card, or Play Console → User acquisition → Retained installers.","Returning = active today and not new. For exact D1/D7/D30 retention (free): Firebase Console → Analytics → Dashboard → Retention card, or Play Console → User acquisition → Retained installers."),
 home:M("🏠 الرئيسية","🏠 Home","🏠 Accueil","🏠 Inicio","🏠 主页","🏠 होम","🏠 Início","🏠 Start"),
 /* acid */
 acT:M("🧫 حاسبة الحمض لماء الري","🧫 Irrigation-water acid calculator","🧫 Calcul d'acide pour l'eau","🧫 Calculadora de ácido para el agua","🧫 灌溉水加酸计算器","🧫 सिंचाई जल अम्ल कैलकुलेटर","🧫 Calculadora de ácido para a água","🧫 Zuurcalculator voor gietwater"),
 acSub:M("يخفّض البيكربونات (القلوية) لتثبيت pH المحلول ومنع انسداد العناصر.","Neutralises bicarbonate (alkalinity) so pH stays stable and nutrients stay available.","Neutralise les bicarbonates pour stabiliser le pH.","Neutraliza bicarbonatos para estabilizar el pH.","中和碳酸氢盐（碱度），稳定 pH，避免养分失效。","बाइकार्बोनेट (क्षारीयता) घटाकर pH स्थिर रखता है।","Neutraliza bicarbonatos para estabilizar o pH.","Neutraliseert bicarbonaat zodat de pH stabiel blijft."),
 vol:M("كمية الماء (لتر)","Water volume (L)","Volume d'eau (L)","Volumen de agua (L)","水量 (L)","पानी की मात्रा (L)","Volume de água (L)","Watervolume (L)"),
 unit:M("وحدة تحليل الماء","Water-test unit","Unité de l'analyse","Unidad del análisis","水质报告单位","जल परीक्षण इकाई","Unidade da análise","Eenheid wateranalyse"),
 uHco3:M("بيكربونات HCO₃ (ملغ/لتر)","Bicarbonate HCO₃ (mg/L)","Bicarbonates HCO₃ (mg/L)","Bicarbonato HCO₃ (mg/L)","碳酸氢根 HCO₃ (mg/L)","बाइकार्बोनेट HCO₃ (mg/L)","Bicarbonato HCO₃ (mg/L)","Bicarbonaat HCO₃ (mg/L)"),
 uCaco3:M("القلوية ككربونات كالسيوم CaCO₃ (ملغ/لتر)","Alkalinity as CaCO₃ (mg/L)","Alcalinité en CaCO₃ (mg/L)","Alcalinidad como CaCO₃ (mg/L)","以 CaCO₃ 计碱度 (mg/L)","CaCO₃ के रूप में क्षारीयता (mg/L)","Alcalinidade como CaCO₃ (mg/L)","Alkaliniteit als CaCO₃ (mg/L)"),
 uMeq:M("مليمكافئ/لتر (meq/L)","meq/L","méq/L","meq/L","meq/L","meq/L","meq/L","meq/L"),
 val:M("القيمة في تحليل الماء","Value from the water test","Valeur de l'analyse","Valor del análisis","报告数值","परीक्षण मान","Valor da análise","Waarde uit analyse"),
 tgt:M("البيكربونات المستهدفة بعد المعالجة (ملغ/لتر)","Target bicarbonate after treatment (mg/L)","HCO₃ visé après traitement (mg/L)","HCO₃ objetivo tras tratar (mg/L)","处理后目标 HCO₃ (mg/L)","उपचार के बाद लक्ष्य HCO₃ (mg/L)","HCO₃ alvo após tratamento (mg/L)","Doel-HCO₃ na behandeling (mg/L)"),
 tgtHint:M("مائي: 30–60 · تربة/أصص: 60–100","Hydroponic: 30–60 · soil/pots: 60–100","Hydroponie : 30–60 · sol : 60–100","Hidropónico: 30–60 · suelo: 60–100","水培：30–60 · 土壤：60–100","हाइड्रो: 30–60 · मिट्टी: 60–100","Hidropônico: 30–60 · solo: 60–100","Hydro: 30–60 · grond: 60–100"),
 acid:M("نوع الحمض","Acid","Acide","Ácido","酸的种类","अम्ल","Ácido","Zuur"),
 aN38:M("نيتريك 38%","Nitric 38%","Nitrique 38 %","Nítrico 38 %","硝酸 38%","नाइट्रिक 38%","Nítrico 38%","Salpeterzuur 38%"),
 aN60:M("نيتريك 60%","Nitric 60%","Nitrique 60 %","Nítrico 60 %","硝酸 60%","नाइट्रिक 60%","Nítrico 60%","Salpeterzuur 60%"),
 aP75:M("فوسفوريك 75%","Phosphoric 75%","Phosphorique 75 %","Fosfórico 75 %","磷酸 75%","फॉस्फोरिक 75%","Fosfórico 75%","Fosforzuur 75%"),
 aP85:M("فوسفوريك 85%","Phosphoric 85%","Phosphorique 85 %","Fosfórico 85 %","磷酸 85%","फॉस्फोरिक 85%","Fosfórico 85%","Fosforzuur 85%"),
 aS96:M("كبريتيك 96% (خطر جداً)","Sulfuric 96% (very hazardous)","Sulfurique 96 % (très dangereux)","Sulfúrico 96 % (muy peligroso)","硫酸 96%（高危）","सल्फ्यूरिक 96% (बहुत खतरनाक)","Sulfúrico 96% (muito perigoso)","Zwavelzuur 96% (zeer gevaarlijk)"),
 aCit:M("حمض الستريك (بودرة — عضوي)","Citric acid (powder — organic)","Acide citrique (poudre — bio)","Ácido cítrico (polvo — orgánico)","柠檬酸（粉末 — 有机）","साइट्रिक अम्ल (पाउडर — जैविक)","Ácido cítrico (pó — orgânico)","Citroenzuur (poeder — biologisch)"),
 calc:M("احسب","Calculate","Calculer","Calcular","计算","गणना करें","Calcular","Bereken"),
 need:M("أدخل القيمة من تحليل الماء","Enter the value from your water test","Saisissez la valeur de l'analyse","Introduce el valor del análisis","请输入水质报告数值","जल परीक्षण मान दर्ज करें","Informe o valor da análise","Voer de waarde uit de analyse in"),
 noAcid:M("✅ البيكربونات أقل من الهدف — لا حاجة لحمض. اضبط pH فقط إن لزم.","✅ Bicarbonate is already below target — no acid needed. Adjust pH only if required.","✅ HCO₃ déjà sous l'objectif — pas d'acide nécessaire.","✅ HCO₃ ya bajo el objetivo — no hace falta ácido.","✅ HCO₃ 已低于目标 — 无需加酸。","✅ HCO₃ पहले से लक्ष्य से कम — अम्ल की ज़रूरत नहीं।","✅ HCO₃ já abaixo do alvo — sem ácido.","✅ HCO₃ al onder doel — geen zuur nodig."),
 resTot:M("الكمية لكل الماء","Amount for the whole volume","Quantité pour tout le volume","Cantidad para todo el volumen","总用量","पूरी मात्रा हेतु","Quantidade para todo o volume","Hoeveelheid voor het hele volume"),
 res1000:M("لكل 1000 لتر","Per 1000 L","Pour 1000 L","Por 1000 L","每 1000 L","प्रति 1000 L","Por 1000 L","Per 1000 L"),
 meq:M("القلوية المُزالة","Alkalinity removed","Alcalinité neutralisée","Alcalinidad neutralizada","中和碱度","हटाई गई क्षारीयता","Alcalinidade neutralizada","Verwijderde alkaliniteit"),
 addN:M("يضيف نيتروجين (N)","Adds nitrogen (N)","Apporte de l'azote (N)","Aporta nitrógeno (N)","带入氮 (N)","नाइट्रोजन जोड़ता है (N)","Adiciona nitrogênio (N)","Voegt stikstof toe (N)"),
 addP:M("يضيف فوسفور (P)","Adds phosphorus (P)","Apporte du phosphore (P)","Aporta fósforo (P)","带入磷 (P)","फॉस्फोरस जोड़ता है (P)","Adiciona fósforo (P)","Voegt fosfor toe (P)"),
 addS:M("يضيف كبريت (S)","Adds sulfur (S)","Apporte du soufre (S)","Aporta azufre (S)","带入硫 (S)","गंधक जोड़ता है (S)","Adiciona enxofre (S)","Voegt zwavel toe (S)"),
 subNote:M("اطرح هذه العناصر من خلطة السماد حتى لا تتضاعف.","Subtract these nutrients from your fertiliser recipe so they are not doubled.","Déduisez ces éléments de votre recette d'engrais.","Resta estos nutrientes de tu receta de abono.","请在配方中扣除这些养分，避免重复。","इन पोषक तत्वों को खाद मिश्रण से घटाएँ।","Desconte estes nutrientes da receita de adubo.","Trek deze voeding af van je recept."),
 pHigh:M("⚠️ الفوسفور المضاف مرتفع (> 50 ppm) — استخدم نيتريك أو اخلط الحمضين.","⚠️ Added phosphorus is high (> 50 ppm) — use nitric acid or mix both acids.","⚠️ Trop de P (> 50 ppm) — utilisez l'acide nitrique ou un mélange.","⚠️ Demasiado P (> 50 ppm) — usa nítrico o mezcla ambos.","⚠️ 带入磷过高（> 50 ppm）— 改用硝酸或混合使用。","⚠️ फॉस्फोरस अधिक (> 50 ppm) — नाइट्रिक या मिश्रण लें।","⚠️ P alto (> 50 ppm) — use nítrico ou misture.","⚠️ Te veel P (> 50 ppm) — gebruik salpeterzuur of meng."),
 safe:M("⚠️ السلامة: أضف الحمض إلى الماء ببطء — لا تضف الماء إلى الحمض أبداً. قفازات ونظارات واقية، وخزّنه بعيداً عن الأطفال. أضف الحمض قبل الأسمدة، وقِس pH بعد 30 دقيقة (الهدف 5.8–6.2 مائي).","⚠️ Safety: always add acid to water slowly — never water to acid. Gloves and goggles, store away from children. Add acid before fertilisers and re-check pH after 30 min (hydro target 5.8–6.2).","⚠️ Sécurité : versez toujours l'acide dans l'eau, jamais l'inverse. Gants, lunettes, hors de portée des enfants. Acide avant les engrais ; mesurez le pH après 30 min.","⚠️ Seguridad: añade siempre el ácido al agua, nunca al revés. Guantes y gafas, lejos de niños. Ácido antes de los abonos; mide el pH a los 30 min.","⚠️ 安全：务必把酸缓慢加入水中，切勿把水加入酸。戴手套和护目镜，远离儿童。先加酸再加肥，30 分钟后复测 pH。","⚠️ सुरक्षा: हमेशा अम्ल को पानी में धीरे डालें — उल्टा कभी नहीं। दस्ताने व चश्मा, बच्चों से दूर। खाद से पहले अम्ल; 30 मिनट बाद pH जाँचें।","⚠️ Segurança: sempre adicione o ácido à água, nunca o contrário. Luvas e óculos, longe de crianças. Ácido antes dos adubos; meça o pH após 30 min.","⚠️ Veiligheid: altijd zuur bij water, nooit andersom. Handschoenen en bril, buiten bereik van kinderen. Zuur vóór meststoffen; meet pH na 30 min."),
 approx:M("الحساب تقريبي؛ جرّب على كمية صغيرة أولاً ثم عدّل حسب pH المقاس.","Estimate only — test on a small batch first and adjust by measured pH.","Estimation — testez d'abord sur un petit volume.","Estimación — prueba primero en poco volumen.","仅为估算 — 先小量试配，再按实测 pH 调整。","अनुमान — पहले थोड़ी मात्रा पर जाँचें।","Estimativa — teste primeiro em pouco volume.","Schatting — test eerst op een kleine hoeveelheid."),
 /* ledger */
 lgT:M("💰 الحصاد والتكاليف والربح","💰 Harvest, costs & profit","💰 Récolte, coûts & bénéfice","💰 Cosecha, costes y beneficio","💰 收获、成本与利润","💰 फसल, लागत व लाभ","💰 Colheita, custos e lucro","💰 Oogst, kosten & winst"),
 lgSub:M("سجّل كل حصاد وكل مصروف لتعرف ربح كل محصول.","Log every harvest and expense to see the profit of each crop.","Notez récoltes et dépenses pour voir le bénéfice par culture.","Registra cosechas y gastos para ver el beneficio por cultivo.","记录每次收获和支出，查看每种作物的利润。","हर फसल व खर्च दर्ज करें, हर फसल का लाभ देखें।","Registre colheitas e despesas para ver o lucro por cultura.","Noteer oogsten en uitgaven om de winst per gewas te zien."),
 year:M("هذه السنة","This year","Cette année","Este año","今年","इस वर्ष","Este ano","Dit jaar"),
 all:M("الكل","All","Tout","Todo","全部","सभी","Tudo","Alles"),
 hKg:M("الحصاد","Harvest","Récolte","Cosecha","收获","फसल","Colheita","Oogst"),
 rev:M("المبيعات","Sales","Ventes","Ventas","销售","बिक्री","Vendas","Verkoop"),
 exp:M("المصاريف","Expenses","Dépenses","Gastos","支出","खर्च","Despesas","Uitgaven"),
 prof:M("صافي الربح","Net profit","Bénéfice net","Beneficio neto","净利润","शुद्ध लाभ","Lucro líquido","Nettowinst"),
 perKg:M("تكلفة الكيلو","Cost per kg","Coût par kg","Coste por kg","每公斤成本","प्रति किलो लागत","Custo por kg","Kosten per kg"),
 byCrop:M("حسب المحصول","By crop","Par culture","Por cultivo","按作物","फसल अनुसार","Por cultura","Per gewas"),
 add:M("➕ إضافة قيد","➕ Add entry","➕ Ajouter","➕ Añadir registro","➕ 添加记录","➕ प्रविष्टि जोड़ें","➕ Adicionar registro","➕ Invoer toevoegen"),
 kH:M("🧺 حصاد / بيع","🧺 Harvest / sale","🧺 Récolte / vente","🧺 Cosecha / venta","🧺 收获 / 销售","🧺 फसल / बिक्री","🧺 Colheita / venda","🧺 Oogst / verkoop"),
 kE:M("💸 مصروف","💸 Expense","💸 Dépense","💸 Gasto","💸 支出","💸 खर्च","💸 Despesa","💸 Uitgave"),
 date:M("التاريخ","Date","Date","Fecha","日期","तारीख","Data","Datum"),
 crop:M("المحصول","Crop","Culture","Cultivo","作物","फसल","Cultura","Gewas"),
 gen:M("عام / كل المزرعة","General / whole farm","Général / toute l'exploitation","General / toda la finca","通用 / 全部","सामान्य / पूरा खेत","Geral / toda a horta","Algemeen / hele bedrijf"),
 qty:M("الكمية (كغ)","Quantity (kg)","Quantité (kg)","Cantidad (kg)","数量 (kg)","मात्रा (किग्रा)","Quantidade (kg)","Hoeveelheid (kg)"),
 sale:M("قيمة البيع (اختياري)","Sale value (optional)","Valeur de vente (option)","Valor de venta (opcional)","销售额（可选）","बिक्री मूल्य (वैकल्पिक)","Valor de venda (opcional)","Verkoopwaarde (optioneel)"),
 amt:M("المبلغ","Amount","Montant","Importe","金额","राशि","Valor","Bedrag"),
 cat:M("البند","Category","Catégorie","Categoría","类别","श्रेणी","Categoria","Categorie"),
 cSeed:M("بذور وشتلات","Seeds & seedlings","Semences & plants","Semillas y plántulas","种子和幼苗","बीज व पौध","Sementes e mudas","Zaad & plantgoed"),
 cFert:M("أسمدة","Fertilisers","Engrais","Fertilizantes","肥料","खाद","Fertilizantes","Meststoffen"),
 cPest:M("مبيدات ومكافحة","Pesticides & control","Phytosanitaires","Fitosanitarios","农药与防治","कीटनाशक","Defensivos","Gewasbescherming"),
 cWater:M("ماء وكهرباء","Water & power","Eau & électricité","Agua y electricidad","水电","पानी व बिजली","Água e energia","Water & stroom"),
 cEquip:M("معدات ومستلزمات","Equipment & supplies","Matériel","Equipos e insumos","设备与耗材","उपकरण","Equipamentos","Materiaal"),
 cLabor:M("عمالة","Labour","Main-d'œuvre","Mano de obra","人工","मज़दूरी","Mão de obra","Arbeid"),
 cOther:M("أخرى","Other","Autre","Otro","其他","अन्य","Outro","Overig"),
 note:M("ملاحظة","Note","Note","Nota","备注","टिप्पणी","Nota","Notitie"),
 cur:M("رمز العملة","Currency symbol","Symbole monétaire","Símbolo de moneda","货币符号","मुद्रा चिह्न","Símbolo da moeda","Valutasymbool"),
 save:M("حفظ","Save","Enregistrer","Guardar","保存","सहेजें","Salvar","Opslaan"),
 badQty:M("أدخل الكمية","Enter the quantity","Saisissez la quantité","Introduce la cantidad","请输入数量","मात्रा दर्ज करें","Informe a quantidade","Voer de hoeveelheid in"),
 badAmt:M("أدخل المبلغ","Enter the amount","Saisissez le montant","Introduce el importe","请输入金额","राशि दर्ज करें","Informe o valor","Voer het bedrag in"),
 recent:M("آخر القيود","Recent entries","Dernières saisies","Últimos registros","最近记录","हाल की प्रविष्टियाँ","Registros recentes","Recente invoer"),
 empty:M("لا قيود بعد.","No entries yet.","Aucune saisie.","Sin registros.","暂无记录。","अभी कोई प्रविष्टि नहीं।","Nenhum registro.","Nog geen invoer."),
 delQ:M("حذف هذا القيد؟","Delete this entry?","Supprimer cette saisie ?","¿Eliminar este registro?","删除此记录？","यह प्रविष्टि हटाएँ?","Excluir este registro?","Deze invoer verwijderen?"),
 del:M("حذف","Delete","Supprimer","Eliminar","删除","हटाएँ","Excluir","Verwijderen"),
 csv:M("📤 تصدير CSV","📤 Export CSV","📤 Exporter CSV","📤 Exportar CSV","📤 导出 CSV","📤 CSV निर्यात","📤 Exportar CSV","📤 CSV exporteren"),
 full:M("مساحة التخزين ممتلئة","Storage is full","Stockage plein","Almacenamiento lleno","存储已满","स्टोरेज भरा","Armazenamento cheio","Opslag vol"),
 /* settings */
 stT:M("⚙️ الإعدادات والنسخ الاحتياطي","⚙️ Settings & backup","⚙️ Réglages & sauvegarde","⚙️ Ajustes y copia de seguridad","⚙️ 设置与备份","⚙️ सेटिंग्स व बैकअप","⚙️ Configurações e backup","⚙️ Instellingen & back-up"),
 fsT:M("🔠 حجم الخط","🔠 Text size","🔠 Taille du texte","🔠 Tamaño del texto","🔠 字体大小","🔠 अक्षर का आकार","🔠 Tamanho do texto","🔠 Tekstgrootte"),
 fsSmall:M("صغير","Small","Petit","Pequeño","小","छोटा","Pequeno","Klein"),
 fsNorm:M("عادي","Normal","Normal","Normal","标准","सामान्य","Normal","Normaal"),
 fsL:M("كبير","Large","Grand","Grande","大","बड़ा","Grande","Groot"),
 fsXL:M("كبير جداً","Extra large","Très grand","Muy grande","特大","बहुत बड़ा","Muito grande","Extra groot"),
 fsXXL:M("الأكبر","Largest","Maximal","Máximo","最大","सबसे बड़ा","Máximo","Grootst"),
 fsSample:M("نموذج: خلطة الطماطم EC 2.2 و pH 6.0","Sample: tomato mix EC 2.2 and pH 6.0","Exemple : tomate EC 2,2 et pH 6,0","Ejemplo: tomate EC 2,2 y pH 6,0","示例：番茄配方 EC 2.2，pH 6.0","उदाहरण: टमाटर EC 2.2 व pH 6.0","Exemplo: tomate EC 2,2 e pH 6,0","Voorbeeld: tomaat EC 2,2 en pH 6,0"),
 bkT:M("💾 نسخة احتياطية (ملف)","💾 Backup (file)","💾 Sauvegarde (fichier)","💾 Copia de seguridad (archivo)","💾 备份（文件）","💾 बैकअप (फ़ाइल)","💾 Backup (arquivo)","💾 Back-up (bestand)"),
 bkSub:M("احفظ كل بياناتك (محاصيلي، السجلات، الخلطات، الحسابات) في ملف، واسترجعها على أي هاتف دون حساب.","Save all your data (crops, logs, recipes, ledger) to a file and restore it on any phone — no account needed.","Enregistrez toutes vos données dans un fichier et restaurez-les sur n'importe quel téléphone, sans compte.","Guarda todos tus datos en un archivo y restáuralos en cualquier teléfono, sin cuenta.","把所有数据保存为文件，可在任何手机恢复，无需账号。","सारा डेटा फ़ाइल में सहेजें और किसी भी फ़ोन पर वापस लाएँ — खाते की ज़रूरत नहीं।","Salve todos os dados num arquivo e restaure em qualquer celular, sem conta.","Bewaar al je gegevens in een bestand en zet ze op elke telefoon terug — geen account nodig."),
 bkExp:M("📤 تصدير نسخة احتياطية","📤 Export backup","📤 Exporter la sauvegarde","📤 Exportar copia","📤 导出备份","📤 बैकअप निर्यात","📤 Exportar backup","📤 Back-up exporteren"),
 bkImp:M("📥 استيراد نسخة احتياطية","📥 Import backup","📥 Importer une sauvegarde","📥 Importar copia","📥 导入备份","📥 बैकअप आयात","📥 Importar backup","📥 Back-up importeren"),
 bkQ:M("استيراد النسخة سيستبدل بياناتك الحالية بالبيانات الموجودة في الملف ({n} عنصراً، بتاريخ {d}). متابعة؟","Importing will replace your current data with the file's data ({n} items, dated {d}). Continue?","L'import remplacera vos données actuelles par celles du fichier ({n} éléments, du {d}). Continuer ?","Importar reemplazará tus datos actuales por los del archivo ({n} elementos, del {d}). ¿Continuar?","导入将用文件中的数据（{n} 项，日期 {d}）替换当前数据。继续？","आयात से वर्तमान डेटा फ़ाइल के डेटा ({n} आइटम, दिनांक {d}) से बदल जाएगा। जारी रखें?","A importação substituirá seus dados atuais pelos do arquivo ({n} itens, de {d}). Continuar?","Importeren vervangt je huidige gegevens door die uit het bestand ({n} items, van {d}). Doorgaan?"),
 bkOk:M("تم الاستيراد ✓ — جارٍ إعادة التحميل","Imported ✓ — reloading","Importé ✓ — rechargement","Importado ✓ — recargando","已导入 ✓ — 正在重新加载","आयात ✓ — पुनः लोड","Importado ✓ — recarregando","Geïmporteerd ✓ — herladen"),
 bkBad:M("الملف ليس نسخة احتياطية صالحة لهذا التطبيق.","This file is not a valid backup of this app.","Ce fichier n'est pas une sauvegarde valide.","El archivo no es una copia válida.","该文件不是本应用的有效备份。","यह फ़ाइल इस ऐप का मान्य बैकअप नहीं है।","O arquivo não é um backup válido.","Dit bestand is geen geldige back-up."),
 bkFull:M("تعذّر حفظ كل البيانات — المساحة ممتلئة.","Couldn't store all data — storage is full.","Stockage plein — import incomplet.","Almacenamiento lleno — importación incompleta.","存储已满 — 导入不完整。","स्टोरेज भरा — आयात अधूरा।","Armazenamento cheio — importação incompleta.","Opslag vol — import onvolledig."),
 bkImport:M("استيراد","Import","Importer","Importar","导入","आयात","Importar","Importeren"),
 bkDone:M("تم تجهيز الملف ✓","Backup file ready ✓","Fichier prêt ✓","Archivo listo ✓","备份文件已生成 ✓","फ़ाइल तैयार ✓","Arquivo pronto ✓","Bestand klaar ✓"),
 ntT:M("🔔 الإشعارات","🔔 Notifications","🔔 Notifications","🔔 Notificaciones","🔔 通知","🔔 सूचनाएँ","🔔 Notificações","🔔 Meldingen"),
 ntSub:M("تنبيهات التقويم والطقس، ونصائح وأخبار التطبيق.","Calendar and weather alerts, plus app tips and news.","Alertes calendrier et météo, conseils et actualités.","Alertas de calendario y clima, consejos y novedades.","日历与天气提醒，以及应用提示和新闻。","कैलेंडर व मौसम अलर्ट, सुझाव व समाचार।","Alertas de calendário e clima, dicas e novidades.","Agenda- en weermeldingen, tips en nieuws."),
 ntOn:M("✅ الإشعارات مفعّلة","✅ Notifications are on","✅ Notifications activées","✅ Notificaciones activadas","✅ 通知已开启","✅ सूचनाएँ चालू हैं","✅ Notificações ativadas","✅ Meldingen staan aan"),
 ntOff:M("الإشعارات متوقفة — لن تصلك تنبيهات الطقس والنصائح.","Notifications are off — you won't get weather alerts or tips.","Notifications désactivées — pas d'alertes ni de conseils.","Notificaciones desactivadas — no recibirás alertas ni consejos.","通知已关闭 — 将收不到天气提醒和提示。","सूचनाएँ बंद — मौसम अलर्ट व सुझाव नहीं मिलेंगे।","Notificações desativadas — sem alertas nem dicas.","Meldingen staan uit — geen weermeldingen of tips."),
 ntEnable:M("🔔 تفعيل الإشعارات","🔔 Turn on notifications","🔔 Activer les notifications","🔔 Activar notificaciones","🔔 开启通知","🔔 सूचनाएँ चालू करें","🔔 Ativar notificações","🔔 Meldingen aanzetten"),
 ntSys:M("⚙️ فتح إعدادات الإشعارات في الهاتف","⚙️ Open phone notification settings","⚙️ Ouvrir les réglages du téléphone","⚙️ Abrir ajustes del teléfono","⚙️ 打开手机通知设置","⚙️ फ़ोन की सूचना सेटिंग खोलें","⚙️ Abrir configurações do celular","⚙️ Telefooninstellingen openen"),
 gaT:M("👤 حساب Google","👤 Google account","👤 Compte Google","👤 Cuenta de Google","👤 Google 账号","👤 Google खाता","👤 Conta Google","👤 Google-account"),
 gaSub:M("سجّل الدخول لحفظ بياناتك في السحابة واستعادتها على أي هاتف، ولتصلك الإشعارات الخاصة بحسابك.","Sign in to back up your data to the cloud, restore it on any phone, and receive account-specific notifications.","Connectez-vous pour sauvegarder dans le cloud, restaurer sur tout téléphone et recevoir des notifications personnelles.","Inicia sesión para respaldar en la nube, restaurar en cualquier teléfono y recibir notificaciones personales.","登录后可云端备份、在任何手机恢复，并接收个人通知。","साइन इन करें: क्लाउड बैकअप, किसी भी फ़ोन पर बहाली और निजी सूचनाएँ।","Entre para salvar na nuvem, restaurar em qualquer celular e receber notificações pessoais.","Log in om naar de cloud te back-uppen, op elke telefoon te herstellen en persoonlijke meldingen te krijgen."),
 acIn:M("تسجيل الدخول بحساب Google","Sign in with Google","Se connecter avec Google","Iniciar sesión con Google","使用 Google 登录","Google से साइन इन करें","Entrar com o Google","Inloggen met Google"),
 acOut:M("تسجيل الخروج","Sign out","Se déconnecter","Cerrar sesión","退出登录","साइन आउट","Sair","Uitloggen"),
 acAs:M("مسجّل باسم","Signed in as","Connecté en tant que","Sesión iniciada como","已登录","इस रूप में साइन इन","Conectado como","Ingelogd als"),
 acSync:M("☁️ المزامنة السحابية ›","☁️ Cloud sync ›","☁️ Synchronisation cloud ›","☁️ Sincronización en la nube ›","☁️ 云同步 ›","☁️ क्लाउड सिंक ›","☁️ Sincronização na nuvem ›","☁️ Cloudsynchronisatie ›"),
 acErr:M("تعذّر تسجيل الدخول، أعد المحاولة.","Sign-in failed, please retry.","Échec de connexion, réessayez.","Error al iniciar sesión, reintenta.","登录失败，请重试。","साइन इन विफल, पुनः प्रयास करें।","Falha ao entrar, tente novamente.","Inloggen mislukt, probeer opnieuw."),
 adT:M("📊 لوحة المطوّر","📊 Developer dashboard","📊 Developer dashboard","📊 Developer dashboard","📊 Developer dashboard","📊 Developer dashboard","📊 Developer dashboard","📊 Developer dashboard"),
 adSub:M("أرقام إجمالية مجهولة الهوية: لا أسماء ولا بريد ولا معرّفات.","Anonymous aggregate numbers only — no names, emails or IDs.","Anonymous aggregate numbers only — no names, emails or IDs.","Anonymous aggregate numbers only — no names, emails or IDs.","Anonymous aggregate numbers only — no names, emails or IDs.","Anonymous aggregate numbers only — no names, emails or IDs.","Anonymous aggregate numbers only — no names, emails or IDs.","Anonymous aggregate numbers only — no names, emails or IDs."),
 adOpen:M("فتح الإحصاءات ›","Open stats ›","Open stats ›","Open stats ›","Open stats ›","Open stats ›","Open stats ›","Open stats ›"),
 adLoad:M("جارٍ التحميل…","Loading…","Loading…","Loading…","Loading…","Loading…","Loading…","Loading…"),
 adErr:M("تعذّر التحميل: ","Couldn't load: ","Couldn't load: ","Couldn't load: ","Couldn't load: ","Couldn't load: ","Couldn't load: ","Couldn't load: "),
 adInst:M("إجمالي التثبيتات (منذ v8.3)","Total installs (since v8.3)","Total installs (since v8.3)","Total installs (since v8.3)","Total installs (since v8.3)","Total installs (since v8.3)","Total installs (since v8.3)","Total installs (since v8.3)"),
 adToday:M("نشطون اليوم","Active today","Active today","Active today","Active today","Active today","Active today","Active today"),
 adNew7:M("جدد آخر 7 أيام","New, last 7 days","New, last 7 days","New, last 7 days","New, last 7 days","New, last 7 days","New, last 7 days","New, last 7 days"),
 adAvg7:M("متوسط النشطين يومياً (7 أيام)","Avg daily active (7 days)","Avg daily active (7 days)","Avg daily active (7 days)","Avg daily active (7 days)","Avg daily active (7 days)","Avg daily active (7 days)","Avg daily active (7 days)"),
 adSigned:M("مسجّلو الدخول اليوم","Signed in today","Signed in today","Signed in today","Signed in today","Signed in today","Signed in today","Signed in today"),
 adDays:M("آخر 14 يوماً (نشطون / جدد)","Last 14 days (active / new)","Last 14 days (active / new)","Last 14 days (active / new)","Last 14 days (active / new)","Last 14 days (active / new)","Last 14 days (active / new)","Last 14 days (active / new)"),
 adCty:M("الدول (كل التثبيتات)","Countries (all installs)","Countries (all installs)","Countries (all installs)","Countries (all installs)","Countries (all installs)","Countries (all installs)","Countries (all installs)"),
 adVer:M("الإصدارات (نشطون اليوم)","Versions (active today)","Versions (active today)","Versions (active today)","Versions (active today)","Versions (active today)","Versions (active today)","Versions (active today)"),
 adLang:M("لغات التطبيق (كل التثبيتات)","App languages (all installs)","App languages (all installs)","App languages (all installs)","App languages (all installs)","App languages (all installs)","App languages (all installs)","App languages (all installs)"),
 adNote:M("للأرقام الكاملة منذ النشر: Play Console ← Statistics، وFirebase ← Analytics.","For full numbers since launch: Play Console › Statistics and Firebase › Analytics.","For full numbers since launch: Play Console › Statistics and Firebase › Analytics.","For full numbers since launch: Play Console › Statistics and Firebase › Analytics.","For full numbers since launch: Play Console › Statistics and Firebase › Analytics.","For full numbers since launch: Play Console › Statistics and Firebase › Analytics.","For full numbers since launch: Play Console › Statistics and Firebase › Analytics.","For full numbers since launch: Play Console › Statistics and Firebase › Analytics."),
 palT:M("🎨 ألوان التطبيق","🎨 App colours","🎨 Couleurs de l'app","🎨 Colores de la app","🎨 应用配色","🎨 ऐप के रंग","🎨 Cores do app","🎨 App-kleuren"),
 pGreen:M("أخضر عشبي (الأصلي)","Grass green (original)","Vert herbe (original)","Verde hierba (original)","草绿（原始）","घास हरा (मूल)","Verde grama (original)","Grasgroen (origineel)"),
 pEmerald:M("زمردي","Emerald","Émeraude","Esmeralda","翡翠绿","पन्ना","Esmeralda","Smaragd"),
 pForest:M("غابة","Forest","Forêt","Bosque","森林绿","वन","Floresta","Bos"),
 pOcean:M("محيط","Ocean","Océan","Océano","海洋蓝","सागर","Oceano","Oceaan"),
 pOlive:M("زيتوني ورملي","Olive & sand","Olive & sable","Oliva y arena","橄榄与沙","जैतूनी व रेत","Oliva e areia","Olijf & zand"),
 palQ:M("تطبيق الألوان يعيد تحميل التطبيق. متابعة؟","Applying the colours reloads the app. Continue?","Appliquer les couleurs recharge l'app. Continuer ?","Aplicar los colores recarga la app. ¿Continuar?","应用配色将重新加载。继续？","रंग लागू करने पर ऐप फिर लोड होगा। जारी रखें?","Aplicar as cores recarrega o app. Continuar?","Kleuren toepassen herlaadt de app. Doorgaan?"),
 apply:M("تطبيق","Apply","Appliquer","Aplicar","应用","लागू करें","Aplicar","Toepassen"),
 musT:M("🎵 موسيقى هادئة","🎵 Calm music","🎵 Musique calme","🎵 Música tranquila","🎵 舒缓音乐","🎵 शांत संगीत","🎵 Música calma","🎵 Rustige muziek"),
 musSub:M("موسيقى خلفية هادئة أثناء استخدام التطبيق، تتوقف تلقائياً عند الخروج منه.","Soft background music while you use the app; it stops when you leave.","Musique douce pendant l'utilisation ; s'arrête en quittant l'app.","Música suave mientras usas la app; se detiene al salir.","使用应用时播放轻柔背景音乐，离开时自动停止。","ऐप उपयोग के दौरान हल्का संगीत; बाहर जाने पर रुकता है।","Música suave enquanto usa o app; para ao sair.","Zachte achtergrondmuziek tijdens gebruik; stopt als je de app verlaat."),
 musOn:M("▶ تشغيل","▶ On","▶ Activer","▶ Activar","▶ 开启","▶ चालू","▶ Ligar","▶ Aan"),
 musOff:M("⏸ إيقاف","⏸ Off","⏸ Désactiver","⏸ Desactivar","⏸ 关闭","⏸ बंद","⏸ Desligar","⏸ Uit"),
 musVol:M("مستوى الصوت","Volume","Volume","Volumen","音量","आवाज़","Volume","Volume"),
 bkSize:M("الحجم","Size","Taille","Tamaño","大小","आकार","Tamanho","Grootte")
};

/* ---------- overlay ---------- */
var ov=null,wrap=null,cssDone=false,view="";
function css(){if(cssDone)return;cssDone=true;var st=el("style");st.textContent=
".farmov{position:fixed;inset:0;z-index:99993;background:linear-gradient(180deg,#F3F9F1,#E8F2E4);color:#132520;overflow:auto;display:none;font-family:inherit}.farmov.on{display:block}[data-theme=\"dark\"] .farmov{background:linear-gradient(180deg,#0a2618,#071c12);color:#eaf7f1}"+
".farmw{max-width:640px;margin:0 auto;padding:16px 16px 96px}.farmw h2{margin:.2em 0 4px}"+
".fmc{background:#fff;border:1px solid #E3ECE3;border-radius:16px;box-shadow:0 2px 10px rgba(30,70,30,.06);padding:14px 16px;margin:12px 0;color:#132520}[data-theme=\"dark\"] .fmc{background:#0f2f1f;border-color:#1f4a34;color:#eaf7f1}"+
".fmh{font-weight:900;font-size:16px;margin-bottom:8px}.fmn{font-size:12.5px;color:#5E7169;line-height:1.6}[data-theme=\"dark\"] .fmn{color:#9fb8ad}"+
".farmw label{display:block;font-weight:700;font-size:13px;margin:8px 0 3px}.farmw select,.farmw input{width:100%;box-sizing:border-box;padding:10px;border-radius:10px;border:1px solid #D5E3D5;background:#fff;color:#132520;font-size:14px;font-family:inherit}[data-theme=\"dark\"] .farmw select,[data-theme=\"dark\"] .farmw input{background:#0f2f1f;color:#eaf7f1;border-color:#1f4a34}"+
".fmbtn{width:100%;padding:12px;border:none;border-radius:12px;background:#2FA25E;color:#fff;font-weight:800;font-size:14.5px;margin-top:10px;cursor:pointer}.fmbtn.g{background:transparent;border:1px solid #B9CDBB;color:inherit}"+
".fmhome{border:1px solid #B9CDBB;background:transparent;color:inherit;border-radius:10px;padding:7px 12px;font-weight:800;font-size:13px;cursor:pointer}"+
".fmrow{display:flex;justify-content:space-between;gap:10px;padding:6px 0;border-bottom:1px dashed #E3ECE3;font-size:14px}.fmrow:last-child{border-bottom:none}[data-theme=\"dark\"] .fmrow{border-color:#1f4a34}.fmrow b{white-space:nowrap}"+
".fmbig{font-size:22px;font-weight:900;color:#1f6b3d}[data-theme=\"dark\"] .fmbig{color:#6fe0a0}"+
".fmwarn{margin-top:8px;padding:9px 11px;border-radius:10px;background:#FFF4E5;color:#7a4300;font-weight:700;font-size:13px;line-height:1.55}[data-theme=\"dark\"] .fmwarn{background:#3a2a10;color:#ffd79a}"+
".fmok{margin-top:8px;padding:9px 11px;border-radius:10px;background:#E8F6EC;color:#1f6b3d;font-weight:700;font-size:13px;line-height:1.55}[data-theme=\"dark\"] .fmok{background:#12402a;color:#bff0d2}"+
".fmseg{display:flex;gap:6px;flex-wrap:wrap;margin-top:6px}.fmseg button{flex:1 1 auto;padding:9px 10px;border-radius:10px;border:1px solid #B9CDBB;background:transparent;color:inherit;font-weight:800;font-size:13px;cursor:pointer}.fmseg button.on{background:#2FA25E;color:#fff;border-color:#2FA25E}"+
".fmkpi{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px}.fmkpi div{background:#EEF6EE;border-radius:12px;padding:10px}[data-theme=\"dark\"] .fmkpi div{background:#153826}.fmkpi b{display:block;font-size:17px;margin-top:2px}.fmkpi span{font-size:12px;opacity:.75}"+
".fmitem{display:flex;justify-content:space-between;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid #EEF3EE}[data-theme=\"dark\"] .fmitem{border-color:#1f4a34}.fmitem .t{font-weight:800;font-size:14px}.fmitem .s{font-size:12px;opacity:.7}"+
".fmdel{background:none;border:none;color:#B42318;font-size:19px;cursor:pointer;min-width:40px;min-height:40px}[data-theme=\"dark\"] .fmdel{color:#FF8B8B}.fmpos{color:#1f6b3d}.fmneg{color:#B42318}[data-theme=\"dark\"] .fmpos{color:#6fe0a0}[data-theme=\"dark\"] .fmneg{color:#FF8B8B}"+
".farmw button:focus-visible,.farmw select:focus-visible,.farmw input:focus-visible{outline:2.5px solid #2FA25E;outline-offset:2px}"+
".amtot{background:#E3F2E3;border:1.5px solid #9CCF9C;border-radius:16px;padding:14px;text-align:center}.amtot small{display:block;font-size:13.5px;font-weight:800}.amtot b{display:block;font-size:30px;font-weight:900;color:#1f6b3d;margin:6px 0}.amtot span{font-size:12.5px;opacity:.8}[data-theme=\"dark\"] .amtot{background:#12402a;border-color:#2c6b47}[data-theme=\"dark\"] .amtot b{color:#8ff0b6}"+
".amcards{display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-top:8px}.amc{background:#EEF2EE;border-radius:12px;padding:8px 4px;text-align:center}.amc small{display:block;font-size:11.5px;font-weight:700}.amc b{display:block;font-size:14px;color:#1f6b3d;margin:3px 0;white-space:nowrap}.amc span{font-size:10.5px;opacity:.75}[data-theme=\"dark\"] .amc{background:#153826}[data-theme=\"dark\"] .amc b{color:#8ff0b6}"+
".amt{width:100%;border-collapse:collapse;font-size:12.5px;margin-top:8px}.amt th{color:#B7791F;font-weight:800;padding:6px 3px;text-align:center}.amt td{padding:6px 3px;text-align:center;border-top:1px solid #E3ECE3}[data-theme=\"dark\"] .amt td{border-color:#1f4a34}.amt td:first-child,.amt th:first-child{text-align:start}"+
".amsum{cursor:pointer;font-weight:800;margin-top:10px;font-size:14px}.ambars{display:flex;align-items:flex-end;gap:2px;height:70px;margin-top:6px;direction:ltr}.ambars i{flex:1;background:#2FA25E;border-radius:2px 2px 0 0;min-height:1px}.amseg{display:flex;gap:6px;margin:0 0 8px}.amseg button{flex:1;padding:7px;border-radius:10px;border:1px solid #B9CDBB;background:transparent;color:inherit;font-weight:800;font-size:12.5px;cursor:pointer}.amseg button.on{background:#2FA25E;color:#fff;border-color:#2FA25E}"+
".amana{margin:0;padding-inline-start:18px;font-size:12.5px;line-height:1.75}.amana li{margin:2px 0}.amsteps{white-space:pre-line;font-size:12px;line-height:1.75;direction:auto}";
document.head.appendChild(st);}
function shell(){css();if(ov)return;ov=el("div",{"class":"farmov",role:"dialog","aria-modal":"true"});wrap=el("div",{"class":"farmw"});ov.appendChild(wrap);document.body.appendChild(ov);}
function show(){ov.classList.add("on");try{ov.scrollTop=0;}catch(_){}}
function close(){if(ov)ov.classList.remove("on");try{window.__goHome&&window.__goHome();}catch(_){}}
function head(t,sub){wrap.innerHTML="";var hb=el("button",{"class":"fmhome"},T(S.home));hb.addEventListener("click",close);wrap.appendChild(hb);wrap.appendChild(el("h2",null,T(t)));if(sub)wrap.appendChild(el("div",{"class":"fmn"},T(sub)));}
function card(t){var c=el("div",{"class":"fmc"});if(t)c.appendChild(el("div",{"class":"fmh"},T(t)));wrap.appendChild(c);return c;}
function row(c,k,v,cls){var r0=el("div",{"class":"fmrow"});r0.appendChild(el("span",null,k));var b=el("b",cls?{"class":cls}:null);b.appendChild(bdi(v));r0.appendChild(b);c.appendChild(r0);return r0;}
function field(c,id,label,attrs){c.appendChild(el("label",{"for":id},label));var a={id:id};for(var k in attrs)a[k]=attrs[k];var i=el("input",a);c.appendChild(i);return i;}
function select(c,id,label,opts,val){c.appendChild(el("label",{"for":id},label));var s=el("select",{id:id});opts.forEach(function(o){s.appendChild(el("option",{value:o[0]},o[1]));});if(val!=null)s.value=val;c.appendChild(s);return s;}

/* ================= ACID CALCULATOR ================= */
/* w = mass fraction, d = density g/ml, mw g/mol, h = protons neutralised per molecule at pH 5.5–6.5, el = nutrient added, em = its g/mol per mol acid */
var ACIDS={n38:{l:S.aN38,w:0.38,d:1.235,mw:63.01,h:1,el:"N",em:14.007},n60:{l:S.aN60,w:0.60,d:1.367,mw:63.01,h:1,el:"N",em:14.007},
 p75:{l:S.aP75,w:0.75,d:1.579,mw:97.99,h:1,el:"P",em:30.974},p85:{l:S.aP85,w:0.85,d:1.685,mw:97.99,h:1,el:"P",em:30.974},
 s96:{l:S.aS96,w:0.96,d:1.835,mw:98.08,h:2,el:"S",em:32.06},cit:{l:S.aCit,w:0.995,d:0,mw:192.12,h:2,el:"",em:0}};
function acidCalc(o){/* returns {meq, ml|g, per1000, add} ; meq/L of HCO3 to neutralise */
 var hco3=o.unit==="meq"?o.val*61.02:(o.unit==="caco3"?o.val*1.22:o.val);var meq=(hco3-o.tgt)/61.02;if(!(meq>0))return {meq:0};
 var a=ACIDS[o.acid],mmolAcid=meq/a.h,gPure=mmolAcid*a.mw/1000,perL=a.d?gPure/(a.w*a.d):gPure/a.w;
 var add=a.el?mmolAcid*a.em:0;return {meq:meq,perL:perL,tot:perL*o.vol,per1000:perL*1000,solid:!a.d,add:add,el:a.el};}
window.__acidCalc=acidCalc;
function renderAcid(){view="acid";head(S.acT,S.acSub);var st=ls("hydro_acid",{})||{};
 var c=card(null);var iv=field(c,"fmvol",T(S.vol),{type:"number",inputmode:"decimal",min:"1",value:st.vol||"100"});
 var iu=select(c,"fmunit",T(S.unit),[["hco3",T(S.uHco3)],["caco3",T(S.uCaco3)],["meq",T(S.uMeq)]],st.unit||"hco3");
 var ix=field(c,"fmval",T(S.val),{type:"number",inputmode:"decimal",min:"0",value:st.val||""});
 var it=field(c,"fmtgt",T(S.tgt),{type:"number",inputmode:"decimal",min:"0",value:st.tgt||"50"});c.appendChild(el("div",{"class":"fmn"},T(S.tgtHint)));
 var ia=select(c,"fmacid",T(S.acid),Object.keys(ACIDS).map(function(k){return [k,T(ACIDS[k].l)];}),st.acid||"n38");
 var b=el("button",{"class":"fmbtn"},T(S.calc));c.appendChild(b);var out=el("div",{"aria-live":"polite"});wrap.appendChild(out);
 function go(){var o={vol:n(iv.value),unit:iu.value,val:n(ix.value),tgt:n(it.value),acid:ia.value};out.innerHTML="";
  if(o.val==null||o.val<0){toast(T(S.need));try{ix.focus();}catch(_){}return;}if(!(o.vol>0)||o.vol>1e6)o.vol=100;if(o.tgt==null||o.tgt<0)o.tgt=50;if(o.val>5000)o.val=5000;
  lsSet("hydro_acid",{vol:String(o.vol),unit:o.unit,val:String(o.val),tgt:String(o.tgt),acid:o.acid});
  var res=acidCalc(o),rc=el("div",{"class":"fmc"});out.appendChild(rc);
  if(!res.meq){rc.appendChild(el("div",{"class":"fmok"},T(S.noAcid)));return;}
  var u=res.solid?" g":" ml";rc.appendChild(el("div",{"class":"fmn"},T(S.resTot)));var big=el("div",{"class":"fmbig"});big.appendChild(bdi(fmtN(res.tot,res.tot<10?2:1)+u));rc.appendChild(big);
  row(rc,T(S.res1000),fmtN(res.per1000,1)+u);row(rc,T(S.meq),fmtN(res.meq,2)+" meq/L");
  if(res.el){row(rc,T(res.el==="N"?S.addN:res.el==="P"?S.addP:S.addS),fmtN(res.add,1)+" ppm");rc.appendChild(el("div",{"class":"fmn"},T(S.subNote)));}
  if(res.el==="P"&&res.add>50)rc.appendChild(el("div",{"class":"fmwarn"},T(S.pHigh)));
  rc.appendChild(el("div",{"class":"fmwarn"},T(S.safe)));rc.appendChild(el("div",{"class":"fmn",style:"margin-top:6px"},T(S.approx)));
  track("acid_calc",{acid:o.acid,meq:r(res.meq,1)});try{rc.scrollIntoView({block:"nearest",behavior:"smooth"});}catch(_){}}
 b.addEventListener("click",go);if(st.val)go();show();}

/* ================= HARVEST / COST / PROFIT LEDGER ================= */
var LK="hydro_ledger",CUR="hydro_cur",fYear=true,fKind="h";
var CATS=[["seed",S.cSeed],["fert",S.cFert],["pest",S.cPest],["water",S.cWater],["equip",S.cEquip],["labor",S.cLabor],["other",S.cOther]];
function ledger(){var a=ls(LK,[]);return Object.prototype.toString.call(a)==="[object Array]"?a:[];}
function crops(){var a=ls("hydro_crops",[]);return Object.prototype.toString.call(a)==="[object Array]"?a:[];}
function catName(k){for(var i=0;i<CATS.length;i++)if(CATS[i][0]===k)return T(CATS[i][1]);return T(S.cOther);}
function cur(){var c=ls(CUR,"");return typeof c==="string"?c:"";}
function money(v){var c=cur();return fmtN(v,2)+(c?" "+c:"");}
function renderLedger(){view="ledger";head(S.lgT,S.lgSub);var all=ledger(),yr=String(new Date().getFullYear());
 var list=fYear?all.filter(function(e){return String(e.d||"").slice(0,4)===yr;}):all;
 /* summary */
 var sc=card(null);var seg=el("div",{"class":"fmseg"});[[true,S.year],[false,S.all]].forEach(function(o){var b=el("button",{"class":fYear===o[0]?"on":"","aria-pressed":String(fYear===o[0])},T(o[1]));b.addEventListener("click",function(){fYear=o[0];renderLedger();});seg.appendChild(b);});sc.appendChild(seg);
 var kg=0,rev=0,ex=0,by={};function B(k,nm){if(!by[k])by[k]={nm:nm,kg:0,rev:0,ex:0};return by[k];}
 list.forEach(function(e){var k=e.crop||"_",b=B(k,e.cname||T(S.gen));if(e.k==="h"){kg+=+e.qty||0;rev+=+e.amt||0;b.kg+=+e.qty||0;b.rev+=+e.amt||0;}else{ex+=+e.amt||0;b.ex+=+e.amt||0;}});
 var kp=el("div",{"class":"fmkpi"});[[S.hKg,fmtN(kg,1)+" kg",""],[S.rev,money(rev),""],[S.exp,money(ex),""],[S.prof,money(rev-ex),rev-ex>=0?"fmpos":"fmneg"]].forEach(function(x){var d=el("div");d.appendChild(el("span",null,T(x[0])));var b=el("b",x[2]?{"class":x[2]}:null);b.appendChild(bdi(x[1]));d.appendChild(b);kp.appendChild(d);});sc.appendChild(kp);
 if(kg>0&&ex>0)row(sc,T(S.perKg),money(ex/kg));
 var ks=Object.keys(by);if(ks.length>1||(ks.length===1&&ks[0]!=="_")){sc.appendChild(el("div",{style:"font-weight:900;margin-top:12px"},T(S.byCrop)));
  ks.sort(function(a,b){return (by[b].rev-by[b].ex)-(by[a].rev-by[a].ex);}).forEach(function(k){var x=by[k];var r0=el("div",{"class":"fmitem"});var l=el("div");l.appendChild(el("div",{"class":"t"},"🌱 "+x.nm));var s=el("div",{"class":"s"});s.appendChild(bdi(fmtN(x.kg,1)+" kg · +"+money(x.rev)+" · −"+money(x.ex)));l.appendChild(s);r0.appendChild(l);var p=el("b",{"class":x.rev-x.ex>=0?"fmpos":"fmneg"});p.appendChild(bdi(money(x.rev-x.ex)));r0.appendChild(p);sc.appendChild(r0);});}
 /* add form */
 var f=card(S.add);var ks2=el("div",{"class":"fmseg"});[["h",S.kH],["e",S.kE]].forEach(function(o){var b=el("button",{"class":fKind===o[0]?"on":"","aria-pressed":String(fKind===o[0])},T(o[1]));b.addEventListener("click",function(){fKind=o[0];renderLedger();setTimeout(function(){try{document.getElementById("fmd").scrollIntoView({block:"center"});}catch(_){}},30);});ks2.appendChild(b);});f.appendChild(ks2);
 var idt=field(f,"fmd",T(S.date),{type:"date",value:today(),max:today()});
 var copts=[["",T(S.gen)]].concat(crops().map(function(c){return [c.id,c.name+(c.variety?" · "+c.variety:"")];}));var icr=select(f,"fmcrop",T(S.crop),copts,ls("hydro_ledger_last","")||"");if(icr.selectedIndex<0)icr.value="";
 var iq=null,ic=null;if(fKind==="h")iq=field(f,"fmq",T(S.qty),{type:"number",inputmode:"decimal",min:"0",step:"0.1"});else ic=select(f,"fmcat",T(S.cat),CATS.map(function(c){return [c[0],T(c[1])];}),"fert");
 var cu=cur();var ia=field(f,"fma",(fKind==="h"?T(S.sale):T(S.amt))+(cu?" ("+cu+")":""),{type:"number",inputmode:"decimal",min:"0",step:"0.01"});
 var inote=field(f,"fmnote",T(S.note),{type:"text",maxlength:"80"});
 var sb=el("button",{"class":"fmbtn"},T(S.save));f.appendChild(sb);
 sb.addEventListener("click",function(){var q=iq?n(iq.value):null,a=n(ia.value);if(fKind==="h"&&!(q>0)){toast(T(S.badQty));try{iq.focus();}catch(_){}return;}if(fKind==="e"&&!(a>0)){toast(T(S.badAmt));try{ia.focus();}catch(_){}return;}
  var cn="";for(var i=0;i<copts.length;i++)if(copts[i][0]===icr.value)cn=copts[i][1];
  var e={id:"l"+Date.now(),d:idt.value||today(),k:fKind,crop:icr.value||"",cname:icr.value?cn:"",qty:q||0,amt:a||0,cat:ic?ic.value:"",note:(inote.value||"").trim().slice(0,80)};
  var arr=ledger();arr.push(e);arr.sort(function(x,y){return x.d<y.d?1:x.d>y.d?-1:0;});if(arr.length>2000)arr=arr.slice(0,2000);
  if(!lsSet(LK,arr)){toast(T(S.full));return;}lsSet("hydro_ledger_last",icr.value||"");window.__goodMoment&&window.__goodMoment("ledger");track("ledger_add",{k:fKind});renderLedger();});
 /* currency */
 var cc=el("div",{style:"margin-top:4px"});var icur=field(cc,"fmcur",T(S.cur),{type:"text",maxlength:"6",value:cu,placeholder:"JOD / $ / €"});icur.addEventListener("change",function(){lsSet(CUR,(icur.value||"").trim().slice(0,6));renderLedger();});f.appendChild(cc);
 /* recent */
 var rc=card(S.recent);if(!list.length)rc.appendChild(el("div",{"class":"fmn"},T(S.empty)));
 list.slice(0,60).forEach(function(e){var r0=el("div",{"class":"fmitem"});var l=el("div");l.appendChild(el("div",{"class":"t"},(e.k==="h"?"🧺 ":"💸 ")+(e.cname||T(S.gen))+(e.k==="e"?" · "+catName(e.cat):"")));var s=el("div",{"class":"s"});s.appendChild(bdi(e.d));if(e.note)s.appendChild(document.createTextNode(" · "+e.note));l.appendChild(s);r0.appendChild(l);
  var v=el("b",{"class":e.k==="h"?"fmpos":"fmneg"});v.appendChild(bdi(e.k==="h"?(fmtN(e.qty,1)+" kg"+(e.amt?" · +"+money(e.amt):"")):("−"+money(e.amt))));r0.appendChild(v);
  var d=el("button",{"class":"fmdel","aria-label":T(S.del),title:T(S.del)},"🗑");d.addEventListener("click",function(){var go=function(y){if(!y)return;lsSet(LK,ledger().filter(function(x){return x.id!==e.id;}));renderLedger();};if(window.__dlg)window.__dlg({msg:T(S.delQ),ok:T(S.del),danger:true},go);else go(window.confirm(T(S.delQ)));});r0.appendChild(d);rc.appendChild(r0);});
 if(all.length){var ex2=el("button",{"class":"fmbtn g"},T(S.csv));ex2.addEventListener("click",function(){exportCsv(list);});rc.appendChild(ex2);}
 show();}
function csvCell(v){v=String(v==null?"":v);return /[",\n]/.test(v)?'"'+v.replace(/"/g,'""')+'"':v;}
function exportCsv(list){var rows=[["date","type","crop","category","qty_kg","amount","currency","note"]];list.forEach(function(e){rows.push([e.d,e.k==="h"?"harvest":"expense",e.cname||"",e.k==="e"?e.cat:"",e.k==="h"?e.qty:"",e.amt||"",cur(),e.note||""]);});
 var csv="﻿"+rows.map(function(r0){return r0.map(csvCell).join(",");}).join("\n");var b=br();track("ledger_csv",{n:list.length});
 try{if(b&&typeof b.shareCsv==="function"){b.shareCsv(csv,"hydro-ledger.csv",T(S.lgT));return;}}catch(_){}
 download(csv,"hydro-ledger.csv","text/csv");}
function download(content,name,mime){try{var bl=new Blob([content],{type:mime}),u=URL.createObjectURL(bl),a=el("a",{href:u,download:name});document.body.appendChild(a);a.click();setTimeout(function(){try{URL.revokeObjectURL(u);a.parentNode.removeChild(a);}catch(_){}},1500);}catch(_){}}

/* ================= SETTINGS: TEXT SIZE + BACKUP ================= */
var TZK="hydro_tz",ZOOMS=[[90,S.fsSmall],[100,S.fsNorm],[115,S.fsL],[130,S.fsXL],[150,S.fsXXL]];
function curZoom(){var z=+ls(TZK,100);return z>=80&&z<=200?z:100;}
function applyZoom(z){var b=br();try{if(b&&typeof b.setTextZoom==="function"){b.setTextZoom(z);document.documentElement.style.zoom="";return;}}catch(_){}try{document.documentElement.style.zoom=z===100?"":String(z/100);}catch(_){}}
/* keys that describe this device only: never exported / imported */
var LOCAL={"__t":1,"hydro_ai_region":1,"hydro_admob":1,"hydro_admob_last":1,"hydro_sync_t":1,"hydro_sync_h":1,"hydro_lang_set":1,"hydro_onb":1,"hydro_onb2":1,"hydro_tz":1};
var B64RE=/^data:[^;,]+;base64,/;
function strip(v){if(typeof v!=="string"||v.indexOf(";base64,")<0)return v;try{var o=JSON.parse(v);var w=function(x){if(typeof x==="string")return (B64RE.test(x)&&x.length>256)?"":x;if(x&&typeof x==="object"){for(var k in x){if(Object.prototype.hasOwnProperty.call(x,k))x[k]=w(x[k]);}}return x;};return JSON.stringify(w(o));}catch(_){return B64RE.test(v)?"":v.replace(/data:[^;,"']+;base64,[A-Za-z0-9+\/=]{256,}/g,"");}}
function snapshot(){var o={},ks=[];try{for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k!=null&&!LOCAL[k])ks.push(k);}ks.sort();ks.forEach(function(k){var v=localStorage.getItem(k);if(v!=null)o[k]=strip(v);});}catch(_){}
 var ver="";try{ver=window.__appVer?window.__appVer():"";}catch(_){}return {app:"com.hydro.calc",kind:"hydro-backup",v:1,ver:ver,t:Date.now(),data:o};}
function exportBackup(){var s=JSON.stringify(snapshot()),name="hydro-backup-"+today()+".json",b=br();track("backup_export",{kb:Math.round(s.length/1024)});
 try{if(b&&typeof b.shareFile==="function"){b.shareFile(s,name,"application/json");toast(T(S.bkDone));return;}}catch(_){}download(s,name,"application/json");toast(T(S.bkDone));}
function importText(txt){var o=null;try{o=JSON.parse(String(txt||"").replace(/^﻿/,""));}catch(_){o=null;}
 if(!o||o.kind!=="hydro-backup"||!o.data||typeof o.data!=="object"){window.__dlg?window.__dlg({msg:T(S.bkBad),cancel:false}):toast(T(S.bkBad));track("backup_bad",{});return;}
 var keys=Object.keys(o.data).filter(function(k){return !LOCAL[k]&&typeof o.data[k]==="string";});var dt="";try{dt=new Date(+o.t).toISOString().slice(0,10);}catch(_){}
 var msg=T(S.bkQ).replace("{n}",String(keys.length)).replace("{d}",dt||"—");
 var go=function(y){if(!y)return;var fail=0;keys.forEach(function(k){try{localStorage.setItem(k,o.data[k]);}catch(_){fail++;}});track("backup_import",{n:keys.length,fail:fail});
  toast(T(fail?S.bkFull:S.bkOk));setTimeout(function(){try{location.reload();}catch(_){}},900);};
 if(window.__dlg)window.__dlg({msg:msg,ok:T(S.bkImport),danger:true},go);else go(window.confirm(msg));}
function pickBackup(){var b=br();try{if(b&&b.setScanMode)b.setScanMode("file");}catch(_){}var inp=document.getElementById("fmbkin");if(!inp){inp=el("input",{type:"file",accept:"application/json,.json,text/plain,*/*",id:"fmbkin",style:"display:none"});document.body.appendChild(inp);
  inp.addEventListener("change",function(){var f=inp.files&&inp.files[0];if(!f)return;if(f.size>8*1024*1024){toast(T(S.bkBad));return;}var rd=new FileReader();rd.onload=function(){importText(rd.result);};rd.onerror=function(){toast(T(S.bkBad));};rd.readAsText(f);});}
 inp.value="";inp.click();}
window.__importBackupText=importText;
var PALS=[["green",S.pGreen,"#2FA25E","#F3F9F1","#0F2F1F"],["emerald",S.pEmerald,"#2FA278","#F3F7F5","#162820"],["forest",S.pForest,"#337A48","#F4F6F4","#192519"],["ocean",S.pOcean,"#2D829A","#F2F6F8","#14242A"],["olive",S.pOlive,"#6F8835","#F8F6F2","#2C2412"]];
function sw(c1,c2,c3){var d=el("span",{"aria-hidden":"true",style:"display:inline-flex;border-radius:8px;overflow:hidden;border:1px solid rgba(0,0,0,.15);margin-inline-end:8px;vertical-align:middle"});[c1,c2,c3].forEach(function(c){d.appendChild(el("span",{"data-nopal":"1",style:"display:inline-block;width:18px;height:22px;background:"+c}));});return d;}
function jparse(v,d){try{return JSON.parse(v);}catch(_){return d;}}
function chain(name,fn){var prev=window[name];window[name]=function(r){window[name]=prev;try{prev&&prev(r);}catch(_){}try{fn(r);}catch(_){}};}
/* v8.8: neutral "Rate" (opens the Play page; Play guidelines: a button must not trigger the in-app review API)
   and "Send feedback" (e-mail) in Settings. No satisfaction question before either (no review gating). */
var FB=[M("⭐ قيّم التطبيق وأرسل ملاحظاتك","⭐ Rate the app & send feedback","⭐ Noter l'app et donner votre avis","⭐ Valora la app y envía comentarios","⭐ 评分与反馈","⭐ ऐप रेट करें और सुझाव भेजें","⭐ Avalie o app e envie sugestões","⭐ App beoordelen en feedback sturen"),
 M("رأيك على Google Play يساعد مزارعين آخرين على إيجاد التطبيق. ولأي مشكلة أو فكرة راسلنا مباشرة.","Your review on Google Play helps other growers find the app. For any problem or idea, write to us directly.","Votre avis sur Google Play aide d'autres cultivateurs à trouver l'app. Pour un problème ou une idée, écrivez-nous.","Tu reseña en Google Play ayuda a otros cultivadores a encontrar la app. Para cualquier problema o idea, escríbenos.","您在 Google Play 的评价能帮助其他种植者找到本应用。有任何问题或想法，请直接联系我们。","Google Play पर आपकी समीक्षा दूसरे किसानों को ऐप खोजने में मदद करती है। कोई समस्या या सुझाव हो तो सीधे लिखें।","Sua avaliação no Google Play ajuda outros produtores a encontrar o app. Para qualquer problema ou ideia, escreva para nós.","Je recensie op Google Play helpt andere kwekers de app te vinden. Voor een probleem of idee kun je ons direct mailen."),
 M("⭐ قيّم على Google Play","⭐ Rate on Google Play","⭐ Noter sur Google Play","⭐ Valorar en Google Play","⭐ 在 Google Play 评分","⭐ Google Play पर रेट करें","⭐ Avaliar no Google Play","⭐ Beoordelen op Google Play"),
 M("✉️ أرسل ملاحظة أو مشكلة","✉️ Send feedback or report a problem","✉️ Envoyer un avis ou un problème","✉️ Enviar comentario o problema","✉️ 发送反馈或报告问题","✉️ सुझाव या समस्या भेजें","✉️ Enviar sugestão ou problema","✉️ Feedback of probleem sturen"),
 M("ملاحظات على مساعد الزراعة المائية","Hydroponic Assistant feedback","Avis sur Assistant Hydroponique","Comentarios sobre Asistente Hidropónico","水培助手反馈","हाइड्रोपोनिक सहायक पर सुझाव","Sugestão sobre o Assistente Hidropônico","Feedback over Hydrocultuur-assistent")];
var FB_MAIL="jotechapp@gmail.com",FB_PLAY="https://play.google.com/store/apps/details?id=com.hydro.calc";
function goUrl(u){try{var a=el("a",{href:u});a.style.display="none";document.body.appendChild(a);a.click();setTimeout(function(){try{a.parentNode&&a.parentNode.removeChild(a);}catch(_){}},500);}catch(_){try{location.href=u;}catch(__){}}}
function feedbackCard(){var c=card(FB[0]);c.appendChild(el("div",{"class":"fmn"},T(FB[1])));
 var r=el("button",{"class":"fmbtn"},T(FB[2]));r.addEventListener("click",function(){track("app_rate_tap",{from:"settings"});goUrl(FB_PLAY);});c.appendChild(r);
 var f=el("button",{"class":"fmbtn g"},T(FB[3]));f.addEventListener("click",function(){var v="";try{v=(window.__appVer&&window.__appVer())||"";}catch(_){}track("feedback_tap",{});
  goUrl("mailto:"+FB_MAIL+"?subject="+encodeURIComponent(T(FB[4])+" "+v+" ("+L()+")"));});c.appendChild(f);
 /* v9.4: re-open the "What's new" sheet */
 if(typeof window.__whatsNew==="function"){var wn=el("button",{"class":"fmbtn g"},window.__whatsNewLabel?window.__whatsNewLabel():"🆕");wn.addEventListener("click",function(){window.__whatsNew(true);});c.appendChild(wn);}}
function renderSettings(){view="settings";head(S.stT,null);
 var B=br();
 /* notifications */
 if(B&&typeof B.notifStatus==="function"){var nc=card(S.ntT);nc.appendChild(el("div",{"class":"fmn"},T(S.ntSub)));var ns=jparse(B.notifStatus(),{perm:"na",on:true});var ok=ns.on&&ns.perm!=="denied";
  nc.appendChild(el("div",{"class":ok?"fmok":"fmwarn"},T(ok?S.ntOn:S.ntOff)));
  if(!ok){var eb=el("button",{"class":"fmbtn"},T(S.ntEnable));eb.addEventListener("click",function(){window.__notifChanged=function(){window.__notifChanged=null;if(ov&&ov.classList.contains("on")&&view==="settings")renderSettings();};try{if(ns.perm==="denied"&&B.askNotifications)B.askNotifications();else if(B.openNotifSettings)B.openNotifSettings();}catch(_){}track("notif_enable",{});});nc.appendChild(eb);
   var sb=el("button",{"class":"fmbtn g"},T(S.ntSys));sb.addEventListener("click",function(){try{B.openNotifSettings&&B.openNotifSettings();}catch(_){}});nc.appendChild(sb);}}
 /* Google account */
 if(B&&typeof B.cloudStatus==="function"){var ac=card(S.gaT);ac.appendChild(el("div",{"class":"fmn"},T(S.gaSub)));var cs=jparse(B.cloudStatus(),{signed:false});
  if(cs.signed){var who=el("div",{"class":"fmok"});who.appendChild(document.createTextNode(T(S.acAs)+": "));who.appendChild(bdi(cs.email||cs.name||""));ac.appendChild(who);
   var sy=el("button",{"class":"fmbtn g"},T(S.acSync));sy.addEventListener("click",function(){ov.classList.remove("on");setTimeout(function(){try{window.__openExtra&&window.__openExtra("sync");}catch(_){}},60);});ac.appendChild(sy);
   var so=el("button",{"class":"fmbtn g"},T(S.acOut));so.addEventListener("click",function(){chain("__cloudAuth",function(){if(view==="settings")renderSettings();});try{B.cloudSignOut();}catch(_){}});ac.appendChild(so);}
  else{var si=el("button",{"class":"fmbtn",style:"display:flex;align-items:center;justify-content:center;gap:10px;background:#fff;color:#1f1f1f;border:1px solid #DADCE0"});si.setAttribute("data-nopal","1");var g=el("span",{"aria-hidden":"true",style:"font-weight:900;font-size:18px;color:#4285F4"},"G");si.appendChild(g);si.appendChild(document.createTextNode(T(S.acIn)));
   si.addEventListener("click",function(){chain("__cloudAuth",function(r){if(r&&r.ok===false)toast(T(S.acErr));else track("google_signin",{from:"settings"});if(ov&&ov.classList.contains("on")&&view==="settings")renderSettings();});try{B.cloudSignIn();}catch(_){}});ac.appendChild(si);}}
 if(B&&typeof B.isAdmin==="function"){var isA=false;try{isA=!!B.isAdmin();}catch(_){}if(isA){var adc=card(S.adT);adc.appendChild(el("div",{"class":"fmn"},T(S.adSub)));var ab=el("button",{"class":"fmbtn"},T(S.adOpen));ab.addEventListener("click",renderAdmin);adc.appendChild(ab);}}
 var pc=card(S.palT),curP=window.__palette||"green";PALS.forEach(function(x){var b=el("button",{"class":"fmbtn g","aria-pressed":String(curP===x[0]),style:"display:flex;align-items:center;justify-content:flex-start;text-align:start;margin-top:8px"+(curP===x[0]?";border:2px solid "+x[2]:"")});b.appendChild(sw(x[2],x[3],x[4]));b.appendChild(document.createTextNode(T(x[1])+(curP===x[0]?"  ✓":"")));
  b.addEventListener("click",function(){if(curP===x[0])return;var go=function(y){if(!y)return;try{localStorage.setItem("hydro_palette",x[0]);}catch(_){}track("palette",{p:x[0]});setTimeout(function(){try{location.reload();}catch(_){}},150);};if(window.__dlg)window.__dlg({msg:T(S.palQ),ok:T(S.apply)},go);else go(window.confirm(T(S.palQ)));});pc.appendChild(b);});
 if(window.__music){var mc=card(S.musT);mc.appendChild(el("div",{"class":"fmn"},T(S.musSub)));var ms=window.__music.get();var seg2=el("div",{"class":"fmseg"});[[true,S.musOn],[false,S.musOff]].forEach(function(o){var b=el("button",{"class":ms.on===o[0]?"on":"","aria-pressed":String(ms.on===o[0])},T(o[1]));b.addEventListener("click",function(){window.__music.set(o[0],null);renderSettings();});seg2.appendChild(b);});mc.appendChild(seg2);
  mc.appendChild(el("label",{"for":"fmvolm"},T(S.musVol)));var rg=el("input",{type:"range",id:"fmvolm",min:"0.05",max:"1",step:"0.05",value:String(ms.vol),style:"padding:0;accent-color:#2FA25E"});rg.addEventListener("input",function(){window.__music.set(null,+rg.value);});mc.appendChild(rg);}
 var fc=card(S.fsT);var z=curZoom();var seg=el("div",{"class":"fmseg"});ZOOMS.forEach(function(o){var b=el("button",{"class":z===o[0]?"on":"","aria-pressed":String(z===o[0])},T(o[1]));b.addEventListener("click",function(){lsSet(TZK,o[0]);applyZoom(o[0]);track("text_zoom",{z:o[0]});renderSettings();});seg.appendChild(b);});fc.appendChild(seg);
 fc.appendChild(el("div",{style:"margin-top:10px;font-size:15px"},T(S.fsSample)));
 var bc=card(S.bkT);bc.appendChild(el("div",{"class":"fmn"},T(S.bkSub)));var sz=0;try{sz=JSON.stringify(snapshot()).length;}catch(_){}row(bc,T(S.bkSize),sz>=1048576?(sz/1048576).toFixed(2)+" MB":Math.max(1,Math.round(sz/1024))+" KB");
 var e=el("button",{"class":"fmbtn"},T(S.bkExp));e.addEventListener("click",exportBackup);bc.appendChild(e);
 var i=el("button",{"class":"fmbtn g"},T(S.bkImp));i.addEventListener("click",pickBackup);bc.appendChild(i);
 feedbackCard();
 show();}

/* ================= VPD + DLI (v8.4) ================= */
/* Tetens saturation vapour pressure (kPa). Leaf VPD = SVP(leaf) - SVP(air) x RH. DLI = PPFD x hours x 3600 / 1e6. */
function svp(t){return 0.61078*Math.exp(17.27*t/(t+237.3));}
function vpdCalc(tAir,rh,off){var sa=svp(tAir),sl=svp(tAir-off);return {vpd:sl-sa*rh/100,sa:sa,sl:sl};}
function rhFor(tAir,off,v){return (svp(tAir-off)-v)/svp(tAir)*100;}
window.__vpdCalc=vpdCalc;window.__dliCalc=function(ppfd,h){return ppfd*h*0.0036;};
var VPD_ST=[["prop",S.stProp,0.4,0.8],["veg",S.stVeg,0.8,1.2],["flower",S.stFlower,1.2,1.6]];
var DLI_CR=[["micro",S.crMicro,6,12],["seed",S.crSeed,8,12],["leafy",S.crLeafy,12,17],["herb",S.crHerb,12,18],["straw",S.crStraw,17,25],["fruit",S.crFruit,20,30]];
var LUXF=[["sun",S.lsSun,0.0185],["led",S.lsLed,0.015],["hps",S.lsHps,0.0122],["fl",S.lsFl,0.0135],["mh",S.lsMh,0.0141]];
function pick(a,k){for(var i=0;i<a.length;i++)if(a[i][0]===k)return a[i];return a[0];}
function seg(c,label,opts,val,on){c.appendChild(el("label",null,label));var w=el("div",{"class":"fmseg",role:"group","aria-label":label});
 opts.forEach(function(o){var b=el("button",{type:"button",dir:"auto","class":o[0]===val?"on":"","aria-pressed":o[0]===val?"true":"false"},o[1]);
  b.addEventListener("click",function(){var bs=w.querySelectorAll("button");for(var i=0;i<bs.length;i++){bs[i].className="";bs[i].setAttribute("aria-pressed","false");}b.className="on";b.setAttribute("aria-pressed","true");on(o[0]);});w.appendChild(b);});
 c.appendChild(w);return w;}
function box(cls,txt){return el("div",{"class":cls},txt);}
function fill(t,o){var s0=T(t);for(var k in o)s0=s0.split("{"+k+"}").join(o[k]);return s0;}
function renderClimate(){view="vpd";head(S.clT,S.clSub);
 var sv=ls("hydro_vpd",{})||{},sd=ls("hydro_dli",{})||{};var u=sv.u==="F"?"F":"C";
 function toC(x){return u==="F"?(x-32)/1.8:x;}function fromC(x){return u==="F"?x*1.8+32:x;}function dC(x){return u==="F"?x/1.8:x;}
 /* ---- VPD ---- */
 var c=card(S.vpdH);c.appendChild(el("div",{"class":"fmn"},T(S.vpdWhat)));
 seg(c,T(S.unitT),[["C","°C"],["F","°F"]],u,function(v){var ta=n(it.value),lo=n(io.value);if(v!==u){if(ta!=null)it.value=String(r(v==="F"?ta*1.8+32:(ta-32)/1.8,1));if(lo!=null)io.value=String(r(v==="F"?lo*1.8:lo/1.8,1));u=v;}calcV();});
 var it=field(c,"fmvt",T(S.tAir),{type:"number",inputmode:"decimal",step:"0.1",value:sv.t!=null?sv.t:(u==="F"?"77":"25")});
 var ih=field(c,"fmvh",T(S.rh),{type:"number",inputmode:"decimal",min:"0",max:"100",step:"1",value:sv.h!=null?sv.h:"60"});
 var io=field(c,"fmvo",T(S.leafOff)+" (°)",{type:"number",inputmode:"decimal",min:"0",max:"10",step:"0.1",value:sv.o!=null?sv.o:(u==="F"?"3.6":"2")});
 c.appendChild(el("div",{"class":"fmn"},T(S.leafHint)));
 var is=select(c,"fmvs",T(S.stage),VPD_ST.map(function(x){return [x[0],T(x[1])];}),sv.s||"veg");
 var outV=el("div",{"aria-live":"polite"});c.appendChild(outV);
 function calcV(){outV.innerHTML="";var ta=n(it.value),rh=n(ih.value),off=n(io.value);if(off==null)off=0;
  lsSet("hydro_vpd",{u:u,t:it.value,h:ih.value,o:io.value,s:is.value});
  if(ta==null||rh==null)return;var tc=toC(ta),oc=dC(off);if(tc<-10||tc>60||rh<0||rh>100||oc<0||oc>10)return;
  var st=pick(VPD_ST,is.value),res=vpdCalc(tc,rh,oc),v=res.vpd,lo=st[2],hi=st[3];
  var big=el("div",{"class":"fmbig",style:"margin-top:10px"});big.appendChild(bdi(fmtN(v,2)+" kPa"));outV.appendChild(big);
  row(outV,T(S.leafT),fmtN(fromC(tc-oc),1)+(u==="F"?" °F":" °C"));
  if(v<0.4)outV.appendChild(box("fmwarn",T(S.vLowD)));else if(v>1.8)outV.appendChild(box("fmwarn",T(S.vHighD)));
  else if(v<lo)outV.appendChild(box("fmwarn",T(S.vLow)));else if(v>hi)outV.appendChild(box("fmwarn",T(S.vHigh)));else outV.appendChild(box("fmok",T(S.vOk)));
  var a=rhFor(tc,oc,hi),b=rhFor(tc,oc,lo);
  if(b<=0||a>=100)outV.appendChild(box("fmn",T(S.rhNA)));
  else outV.appendChild(el("div",{"class":"fmn",style:"margin-top:8px;font-weight:800"},fill(S.rhAdv,{a:String(Math.max(0,Math.round(a))),b:String(Math.min(100,Math.round(b)))})));
  var tb=el("div",{"class":"fmc",style:"margin:10px 0 0;padding:10px 12px"});tb.appendChild(el("div",{"class":"fmh",style:"font-size:13.5px"},T(S.rhTbl)));
  [18,20,22,24,26,28,30].forEach(function(tt){var x=rhFor(tt,oc,hi),y=rhFor(tt,oc,lo);var lab=u==="F"?Math.round(tt*1.8+32)+" °F":tt+" °C";
   var rr=row(tb,"",(y<=0||x>=100)?"—":(Math.max(0,Math.round(x))+"–"+Math.min(100,Math.round(y))+"%"));rr.firstChild.appendChild(bdi(lab));});
  outV.appendChild(tb);}
 [it,ih,io].forEach(function(x){x.addEventListener("input",calcV);});is.addEventListener("change",calcV);
 /* ---- DLI ---- */
 var d=card(S.dliH);d.appendChild(el("div",{"class":"fmn"},T(S.dliWhat)));var m=sd.m==="lux"?"lux":"ppfd";
 seg(d,T(S.meas),[["ppfd",T(S.mPpfd)],["lux",T(S.mLux)]],m,function(v){m=v;lbl();calcD();});
 var srcWrap=el("div");d.appendChild(srcWrap);var isrc=select(srcWrap,"fmdsrc",T(S.src),LUXF.map(function(x){return [x[0],T(x[1])];}),sd.src||"led");
 var vLab=el("label",{"for":"fmdv"});d.appendChild(vLab);var iv=el("input",{id:"fmdv",type:"number",inputmode:"decimal",min:"0",step:"1",value:sd.v!=null?sd.v:"250"});d.appendChild(iv);
 var ihr=field(d,"fmdh",T(S.hours),{type:"number",inputmode:"decimal",min:"0",max:"24",step:"0.5",value:sd.h!=null?sd.h:"16"});
 var icr=select(d,"fmdc",T(S.crop),DLI_CR.map(function(x){return [x[0],T(x[1])];}),sd.c||"leafy");
 var outD=el("div",{"aria-live":"polite"});d.appendChild(outD);
 function lbl(){vLab.textContent=T(m==="lux"?S.valLux:S.valPpfd);srcWrap.style.display=m==="lux"?"block":"none";}
 function calcD(){outD.innerHTML="";var val=n(iv.value),h=n(ihr.value);lsSet("hydro_dli",{m:m,src:isrc.value,v:iv.value,h:ihr.value,c:icr.value});
  if(val==null||h==null||val<0||h<=0||h>24)return;var ppfd=m==="lux"?val*pick(LUXF,isrc.value)[2]:val;if(ppfd>3000)return;
  var dli=ppfd*h*0.0036,cr=pick(DLI_CR,icr.value),lo=cr[2],hi=cr[3],tg=(lo+hi)/2;
  var big=el("div",{"class":"fmbig",style:"margin-top:10px"});big.appendChild(bdi(fmtN(dli,1)+" "+T(S.unitDli)));outD.appendChild(big);
  if(m==="lux"){outD.appendChild(el("div",{"class":"fmn"},fill(S.ppfdEq,{v:fmtN(ppfd,0)})));}
  var tS=fmtN(tg,1)+" "+T(S.unitDli),pN=fmtN(tg/(h*0.0036),0)+" "+T(S.uPpfd),hN=r(tg/(ppfd*0.0036),1);
  if(dli<lo){outD.appendChild(box("fmwarn",(ppfd>0&&hN<=20)?fill(S.dLow,{t:tS,p:pN,h:fmtN(hN,1)}):fill(S.dLowP,{t:tS,p:pN})));}
  else if(dli>hi){outD.appendChild(box("fmwarn",fill(S.dHigh,{t:tS,p:pN,h:fmtN(hN,1)})));}
  else outD.appendChild(box("fmok",T(S.dOk)));
  if(cr[0]==="leafy"&&dli>17)outD.appendChild(box("fmn",T(S.tipburn)));
  if(m==="lux")outD.appendChild(el("div",{"class":"fmn",style:"margin-top:6px"},T(S.luxNote)));}
 [iv,ihr].forEach(function(x){x.addEventListener("input",calcD);});[isrc,icr].forEach(function(x){x.addEventListener("change",calcD);});
 lbl();calcV();calcD();
 card(null).appendChild(el("div",{"class":"fmn"},T(S.rangesNote)));
 track("vpd_open",{});show();}

/* ================= AdMob earnings (developer only, v8.4) =================
   The OAuth client id / secret / refresh token stay in localStorage on the developer's phone (excluded from cloud sync
   and backups). The Cloudflare Worker (POST /admob) exchanges them and asks the AdMob API for the network report. */
var AM_CFG="hydro_admob",AM_LAST="hydro_admob_last",AM_URL="https://hydro-gemini-proxy.aaa78jo.workers.dev/admob",AM_APP="ca-app-pub-2899007461596318~4463646698";
var amBox=null,amDays=null,amBusy=false;
function amCfg(){var c=ls(AM_CFG,null);return (c&&typeof c==="object")?c:{};}
function amMoney(v,cur){v=+v||0;try{return new Intl.NumberFormat("en-US",{style:"currency",currency:cur||"USD",minimumFractionDigits:2,maximumFractionDigits:2}).format(v);}catch(_){return (cur||"")+" "+v.toFixed(2);}}
function amFill(t,o){var s0=T(t);for(var k in o)s0=s0.split("{"+k+"}").join(o[k]);return s0;}
function amKey(off){var d=new Date(Date.now()-off*86400000);return d.getFullYear()+("0"+(d.getMonth()+1)).slice(-2)+("0"+d.getDate()).slice(-2);}
function amSum(a){var o={earn:0,imp:0,clk:0,req:0};(a||[]).forEach(function(x){o.earn+=+x.earn||0;o.imp+=+x.imp||0;o.clk+=+x.clk||0;o.req+=+x.req||0;});return o;}
function amRange(D,from,to){return D.filter(function(x){var k=String(x.DATE);return k>=amKey(from)&&k<=amKey(to);});}
var AM_FMT={BANNER:M("بانر","Banner"),INTERSTITIAL:M("بيني","Interstitial"),APP_OPEN:M("فتح التطبيق","App open"),REWARDED:M("مكافأة","Rewarded"),REWARDED_INTERSTITIAL:M("بيني بمكافأة","Rewarded interstitial"),NATIVE:M("مدمج","Native")};
function amCard(parent){var c=el("div",{"class":"fmc"});c.appendChild(el("div",{"class":"fmh"},T(S.amT)));amBox=el("div",{"aria-live":"polite"});c.appendChild(amBox);parent.appendChild(c);return c;}
function amLoad(force){if(!amBox)return;var cfg=amCfg();if(!cfg.ci||!cfg.cs||!cfg.rt){amForm();return;}
 var last=ls(AM_LAST,null),scope=cfg.scope==="all"?"all":"app";
 if(last&&last.status==="ok"&&last.scope===scope){amRender(last);if(!force&&Date.now()-(+last.at||0)<10*60000)return;}
 else{amBox.innerHTML="";amBox.appendChild(el("div",{"class":"fmn"},T(S.amLoading)));}
 if(amBusy||!window.fetch)return;amBusy=true;
 var body={clientId:cfg.ci,clientSecret:cfg.cs,refreshToken:cfg.rt,account:cfg.acc||"",currency:cfg.cur||""};if(scope==="app")body.appId=AM_APP;
 fetch(AM_URL,{method:"POST",headers:{"Content-Type":"application/json","x-app-id":"com.hydro.calc"},body:JSON.stringify(body),cache:"no-store"})
 .then(function(r){if(r.status===404||r.status===405)return {status:"noroute"};return r.json();})
 .then(function(j){amBusy=false;if(!amBox)return;
  if(!j||j.status==="nokey"){amForm();return;}
  if(j.status==="noroute"){amErr(T(S.amErrWorker));return;}
  if(j.status!=="ok"){var m=String(j.message||"");amErr(/token|invalid_grant|expired|revoked/i.test(m)?T(S.amErrToken)+" ("+m+")":T(S.amErr)+m);return;}
  var c2=amCfg();if(j.account&&(c2.acc!==j.account||c2.cur!==j.currency)){c2.acc=j.account;c2.cur=j.currency;lsSet(AM_CFG,c2);}
  j.scope=scope;lsSet(AM_LAST,j);amRender(j);track("admob_report",{s:scope});})
 ["catch"](function(){amBusy=false;if(amBox&&!(last&&last.status==="ok"))amErr(T(S.amErrNet));});}
function amErr(msg){if(!amBox)return;amBox.innerHTML="";amBox.appendChild(el("div",{"class":"fmwarn"},msg));var row=el("div",{"class":"amseg",style:"margin-top:8px"});var rb=el("button",null,T(S.amRefresh));rb.addEventListener("click",function(){amLoad(true);});var eb=el("button",null,T(S.amEdit));eb.addEventListener("click",amForm);row.appendChild(rb);row.appendChild(eb);amBox.appendChild(row);}
function amForm(){if(!amBox)return;var cfg=amCfg();amBox.innerHTML="";
 amBox.appendChild(el("div",{style:"font-weight:900;margin-bottom:4px"},T(S.amSetT)));amBox.appendChild(el("div",{"class":"fmn"},T(S.amSetNote)));
 var det=el("details",{style:"margin:6px 0"});det.appendChild(el("summary",{"class":"amsum"},T(S.amHow)));det.appendChild(el("div",{"class":"amsteps fmn"},T(S.amSteps)));amBox.appendChild(det);
 function inp(id,ph,val,pw){var i=el("input",{id:id,placeholder:ph,dir:"ltr",autocomplete:"off",autocapitalize:"off",spellcheck:"false",type:pw?"password":"text"});i.value=val||"";i.style.margin="4px 0";amBox.appendChild(i);return i;}
 var a=inp("amci","Client ID",cfg.ci,false),b=inp("amcs","Client secret",cfg.cs,true),c=inp("amrt","Refresh token",cfg.rt,true);
 var sv=el("button",{"class":"fmbtn"},T(S.amSave));amBox.appendChild(sv);
 if(cfg.ci){var cn=el("button",{"class":"fmbtn g"},T(S.amCancel));cn.addEventListener("click",function(){amLoad(false);});amBox.appendChild(cn);}
 sv.addEventListener("click",function(){var d=amCfg();var ci=String(a.value||"").trim(),cs=String(b.value||"").trim(),rt=String(c.value||"").trim();if(!ci||!cs||!rt){toast(T(S.amNeed));return;}
  if(d.ci!==ci||d.rt!==rt){d.acc="";d.cur="";}d.ci=ci;d.cs=cs;d.rt=rt;lsSet(AM_CFG,d);try{localStorage.removeItem(AM_LAST);}catch(_){}track("admob_link",{});amLoad(true);});}
function amRender(r){if(!amBox)return;amBox.innerHTML="";var cur=r.currency||"USD",cfg=amCfg(),scope=r.scope||"app";
 /* scope switch */
 var sg=el("div",{"class":"amseg",role:"group"});[["app",S.amScopeApp],["all",S.amScopeAll]].forEach(function(o){var bt=el("button",{type:"button","class":o[0]===scope?"on":"","aria-pressed":o[0]===scope?"true":"false"},T(o[1]));bt.addEventListener("click",function(){var d=amCfg();if((d.scope==="all"?"all":"app")===o[0])return;d.scope=o[0];lsSet(AM_CFG,d);amLoad(true);});sg.appendChild(bt);});amBox.appendChild(sg);
 var D=(r.daily||[]).slice().sort(function(x,y){return String(x.DATE).localeCompare(String(y.DATE));});
 var byDay={};D.forEach(function(x){byDay[String(x.DATE)]=x;});
 var t0=byDay[amKey(0)]||{earn:0,imp:0},t1=byDay[amKey(1)]||{earn:0,imp:0};
 var w=amSum(amRange(D,6,0)),pw=amSum(amRange(D,13,7)),m=amSum(D);
 var Mo=(r.monthly||[]).slice().sort(function(x,y){return String(x.MONTH).localeCompare(String(y.MONTH));}).filter(function(x){return (+x.earn||0)>0||(+x.imp||0)>0;});
 var all=Mo.length?amSum(Mo):m,rpm=function(o){return o.imp?o.earn/o.imp*1000:0;};
 /* total */
 var tb=el("div",{"class":"amtot"});tb.appendChild(el("small",null,T(S.amTotal)));var big=el("b");big.appendChild(bdi(amMoney(all.earn,cur)));tb.appendChild(big);
 var sub=Math.round(all.imp).toLocaleString("en-US")+" "+T(S.amImp)+" · "+Math.round(all.clk)+" "+T(S.amClk)+(Mo.length?" · "+T(S.amSince)+" "+String(Mo[0].MONTH).slice(4)+"/"+String(Mo[0].MONTH).slice(0,4):"");tb.appendChild(el("span",null,sub));amBox.appendChild(tb);
 /* four tiles */
 var cards=el("div",{"class":"amcards"});[[S.amToday,t0],[S.amYday,t1],[S.am7,w],[S.am30,m]].forEach(function(p){var c=el("div",{"class":"amc"});c.appendChild(el("small",null,T(p[0])));var bb=el("b");bb.appendChild(bdi(amMoney(p[1].earn,cur)));c.appendChild(bb);c.appendChild(el("span",null,Math.round(p[1].imp||0)+" "+T(S.amImp)));cards.appendChild(c);});amBox.appendChild(cards);
 var fill=w.req?Math.round(w.imp*100/w.req):0;
 amBox.appendChild(el("div",{"class":"fmn",style:"margin:8px 0 2px"},amFill(S.amEcpm,{v:amMoney(rpm(w),cur),f:String(fill),c:String(Math.round(w.clk))})));
 if(!D.length&&!Mo.length){amBox.appendChild(el("div",{"class":"fmwarn"},T(S.amNoData)));}
 /* by format */
 var F=(r.byFormat||[]).slice().sort(function(x,y){return (+y.earn||0)-(+x.earn||0);});
 if(F.length){var tbl=el("table",{"class":"amt"});var hr=el("tr");[S.amFmtT,S.amEarn,S.amImpH].forEach(function(h){hr.appendChild(el("th",null,T(h)));});hr.appendChild(el("th",null,"eCPM"));tbl.appendChild(hr);
  F.forEach(function(x){var tr=el("tr");tr.appendChild(el("td",null,T(AM_FMT[x.FORMAT]||{en:String(x.FORMAT)})));var td=el("td");td.appendChild(bdi(amMoney(x.earn,cur)));tr.appendChild(td);tr.appendChild(el("td",null,String(Math.round(x.imp||0))));var td2=el("td");td2.appendChild(bdi(amMoney(x.imp?x.earn/x.imp*1000:0,cur)));tr.appendChild(td2);tbl.appendChild(tr);});amBox.appendChild(tbl);}
 /* 30-day chart */
 if(D.length){amBox.appendChild(el("div",{"class":"fmn",style:"margin-top:10px;font-weight:800"},T(S.amChart)));var bars=el("div",{"class":"ambars",role:"img","aria-label":T(S.amChart)});var mx=0,keys=[];for(var i=29;i>=0;i--){var k=amKey(i);keys.push(k);mx=Math.max(mx,+((byDay[k]||{}).earn)||0);}
  keys.forEach(function(k){var e=+((byDay[k]||{}).earn)||0;var b2=el("i",{title:k.slice(6)+"/"+k.slice(4,6)+" · "+amMoney(e,cur)});b2.style.height=(mx?Math.max(2,Math.round(e/mx*100)):2)+"%";if(!e)b2.style.opacity=".25";bars.appendChild(b2);});amBox.appendChild(bars);}
 /* analysis */
 var A=[];
 if(pw.earn>0){var pc=Math.round(Math.abs(w.earn-pw.earn)/pw.earn*100);A.push(amFill(w.earn>=pw.earn?S.amTrendUp:S.amTrendDn,{a:amMoney(w.earn,cur),b:amMoney(pw.earn,cur),p:String(pc)}));}
 else if(w.earn>0)A.push(amFill(S.amTrendNew,{a:amMoney(w.earn,cur)}));
 if(w.earn>0)A.push(amFill(S.amAvg,{a:amMoney(w.earn/7,cur),b:amMoney(w.earn/7*30,cur)}));
 var best=null;D.forEach(function(x){if(!best||(+x.earn||0)>(+best.earn||0))best=x;});
 if(best&&(+best.earn||0)>0)A.push(amFill(S.amBest,{d:String(best.DATE).slice(6)+"/"+String(best.DATE).slice(4,6),a:amMoney(best.earn,cur)}));
 if(F.length&&w.earn>0&&w.imp>0){var f0=F[0];A.push(amFill(S.amFmtShare,{f:T(AM_FMT[f0.FORMAT]||{en:String(f0.FORMAT)}),e:String(Math.round((+f0.earn||0)*100/w.earn)),i:String(Math.round((+f0.imp||0)*100/w.imp))}));}
 if(w.imp>0){var ctr=Math.round(w.clk*1000/w.imp)/10;A.push(amFill(ctr>5&&w.imp>=200?S.amCtrHigh:S.amCtr,{c:String(ctr)}));}
 if(w.req>=100&&fill<50)A.push(amFill(S.amFillLow,{f:String(fill)}));
 if(scope==="app"&&amDays){var du=0;for(var j=0;j<7;j++){var dd=amDays[(function(o){var d0=new Date(Date.now()-o*86400000);return d0.getUTCFullYear()+("0"+(d0.getUTCMonth()+1)).slice(-2)+("0"+d0.getUTCDate()).slice(-2);})(j)];du+=dd&&dd.dau||0;}
  if(du>0&&w.earn>0)A.push(amFill(S.amArpdau,{a:amMoney(w.earn/du*1000,cur),u:String(du)}));}
 if(A.length){var ac=el("div",{style:"margin-top:10px"});ac.appendChild(el("div",{style:"font-weight:900;font-size:14px;margin-bottom:4px"},T(S.amAnaT)));var ul=el("ul",{"class":"amana"});A.forEach(function(t){ul.appendChild(el("li",null,t));});ac.appendChild(ul);amBox.appendChild(ac);}
 /* monthly + daily details */
 if(Mo.length){var dm=el("details");dm.appendChild(el("summary",{"class":"amsum"},T(S.amMonthly)));var tm=el("table",{"class":"amt"});var h2=el("tr");[S.amMonth,S.amEarn,S.amImpH].forEach(function(h){h2.appendChild(el("th",null,T(h)));});h2.appendChild(el("th",null,"eCPM"));tm.appendChild(h2);
  Mo.slice().reverse().forEach(function(x){var tr=el("tr");tr.appendChild(el("td",null,String(x.MONTH).slice(4)+"/"+String(x.MONTH).slice(0,4)));var a1=el("td");a1.appendChild(bdi(amMoney(x.earn,cur)));tr.appendChild(a1);tr.appendChild(el("td",null,String(Math.round(x.imp||0))));var a2=el("td");a2.appendChild(bdi(amMoney(rpm(x),cur)));tr.appendChild(a2);tm.appendChild(tr);});
  var trs=el("tr",{style:"font-weight:900"});trs.appendChild(el("td",null,T(S.amSum)));var s1=el("td");s1.appendChild(bdi(amMoney(all.earn,cur)));trs.appendChild(s1);trs.appendChild(el("td",null,String(Math.round(all.imp))));var s2=el("td");s2.appendChild(bdi(amMoney(rpm(all),cur)));trs.appendChild(s2);tm.appendChild(trs);dm.appendChild(tm);amBox.appendChild(dm);}
 if(D.length){var dd2=el("details");dd2.appendChild(el("summary",{"class":"amsum"},T(S.amDaily)));var td3=el("table",{"class":"amt"});var h3=el("tr");[S.amDay,S.amEarn,S.amImpH].forEach(function(h){h3.appendChild(el("th",null,T(h)));});td3.appendChild(h3);
  D.slice().reverse().forEach(function(x){var tr=el("tr");tr.appendChild(el("td",null,String(x.DATE).slice(6)+"/"+String(x.DATE).slice(4,6)));var c1=el("td");c1.appendChild(bdi(amMoney(x.earn,cur)));tr.appendChild(c1);tr.appendChild(el("td",null,String(Math.round(x.imp||0))));td3.appendChild(tr);});dd2.appendChild(td3);amBox.appendChild(dd2);}
 /* footer */
 var ft=el("div",{"class":"fmn",style:"margin-top:8px"});var tm2="";try{tm2=new Date(+r.at||Date.now()).toLocaleString(L()==="ar"?"en-GB":undefined,{hour:"2-digit",minute:"2-digit",day:"2-digit",month:"2-digit"});}catch(_){}
 ft.appendChild(document.createTextNode(T(S.amFoot)+" "+amFill(S.amUpdated,{t:tm2})+" "));
 var rl=el("a",{href:"#"},T(S.amRefresh));rl.addEventListener("click",function(e){e.preventDefault();amLoad(true);});ft.appendChild(rl);ft.appendChild(document.createTextNode(" · "));
 var ed=el("a",{href:"#"},T(S.amEdit));ed.addEventListener("click",function(e){e.preventDefault();amForm();});ft.appendChild(ed);amBox.appendChild(ft);}
window.__amRender=function(r){amRender(r);};

/* ================= ADMIN (developer only, anonymous aggregates) ================= */
function utcDay(off){var d=new Date(Date.now()-off*86400000);return d.getUTCFullYear()+("0"+(d.getUTCMonth()+1)).slice(-2)+("0"+d.getUTCDate()).slice(-2);}
function topOf(o,pfx,n){var a=[];for(var k in o)if(k.indexOf(pfx)===0&&typeof o[k]==="number")a.push([k.slice(pfx.length).replace(/_/g,"."),o[k]]);a.sort(function(x,y){return y[1]-x[1];});return a.slice(0,n||12);}
function renderAdmin(){view="admin";head(S.adT,S.adSub);amDays=null;amCard(wrap);amLoad(false);var B=br();var box=card(null);box.appendChild(el("div",{"class":"fmn"},T(S.adLoad)));show();
 if(!B||typeof B.adminStats!=="function")return;
 chain("__adminStats",function(r){if(view!=="admin")return;head(S.adT,S.adSub);amDays={};((r&&r.days)||[]).forEach(function(d){if(d&&d.id)amDays[d.id]=d;});amCard(wrap);amLoad(false);
  if(!r||!r.ok){card(null).appendChild(el("div",{"class":"fmwarn"},T(S.adErr)+String(r&&r.err||"?")));return;}
  var tot=r.total||{},byId={};(r.days||[]).forEach(function(d){byId[d.id]=d;});
  var t0=byId[utcDay(0)]||{},new7=0,dau7=0;for(var i=0;i<7;i++){var d=byId[utcDay(i)]||{};new7+=d["new"]||0;dau7+=d.dau||0;}
  var k=card(null),g=el("div",{"class":"fmkpi"});
  [[S.adInst,tot.installs||0],[S.adToday,t0.dau||0],[S.adRet,Math.max(0,(t0.dau||0)-(t0["new"]||0))],[S.adRet7,dau7?Math.round(Math.max(0,dau7-new7)/dau7*100)+"%":"—"],[S.adNew7,new7],[S.adAvg7,Math.round(dau7/7*10)/10],[S.adSigned,t0.signed||0]].forEach(function(x){var c=el("div");c.appendChild(el("span",null,T(x[0])));c.appendChild(el("b",null,String(x[1])));g.appendChild(c);});
  k.appendChild(g);
  var dc=card(S.adDays3),mx=1;for(var j=0;j<14;j++){var dj=byId[utcDay(j)]||{};mx=Math.max(mx,dj.dau||0);}
  for(var j2=0;j2<14;j2++){var id=utcDay(j2),dd=byId[id]||{},rw=el("div",{"class":"fmrow"});rw.appendChild(el("span",null,id.slice(6)+"/"+id.slice(4,6)));
   var bar=el("span",{style:"flex:1;margin:0 8px;align-self:center;height:8px;border-radius:4px;background:#E3ECE3;position:relative;overflow:hidden"});bar.appendChild(el("span",{style:"position:absolute;inset:0;width:"+Math.round((dd.dau||0)/mx*100)+"%;background:#2FA25E"}));rw.appendChild(bar);
   rw.appendChild(bdi((dd.dau||0)+" / "+(dd["new"]||0)+" / "+Math.max(0,(dd.dau||0)-(dd["new"]||0))));dc.appendChild(rw);}
  [[S.adCty,topOf(tot,"c_")],[S.adVer,topOf(t0,"v_")],[S.adLang,topOf(tot,"l_")]].forEach(function(x){var c=card(x[0]);if(!x[1].length){c.appendChild(el("div",{"class":"fmn"},"—"));return;}x[1].forEach(function(p){row(c,p[0],String(p[1]));});});
  card(null).appendChild(el("div",{"class":"fmn"},T(S.adRetNote)));card(null).appendChild(el("div",{"class":"fmn"},T(S.adNote)));
  track("admin_stats",{});});
 try{B.adminStats();}catch(e){window.__adminStats({ok:false,err:String(e)});}}

/* ---------- public ---------- */
window.__openFarm=function(v){shell();if(v==="acid")renderAcid();else if(v==="ledger")renderLedger();else if(v==="vpd")renderClimate();else renderSettings();try{if(window.__raise)window.__raise(ov);}catch(_){}};
/* re-apply a saved text size in browsers without the native bridge (native side persists its own setting) */
try{var z0=curZoom();if(z0!==100&&!(br()&&typeof br().setTextZoom==="function"))applyZoom(z0);}catch(_){}
})();
