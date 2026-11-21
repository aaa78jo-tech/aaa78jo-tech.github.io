/* ===== Tools (lazy module): real-weather irrigation (Open-Meteo), pH/EC log with chart + alerts, share diagnosis as image,
   re-check follow-up reminder, in-app review prompt, home-screen widget data. 8 languages. ===== */
(function(){
"use strict";
if(window.__toolsInit)return; window.__toolsInit=1;
var LANGS=["ar","en","fr","es","zh","hi","pt","nl"];
var L=function(){var l=document.documentElement.getAttribute("lang")||"en";return LANGS.indexOf(l)>=0?l:"en";};
function M(){var o={};for(var i=0;i<LANGS.length;i++)o[LANGS[i]]=arguments[i];return o;}
var T=function(o){return (o&&(o[L()]||o.en))||"";};
function el(t,a,x){var e=document.createElement(t);if(a)for(var k in a)e.setAttribute(k,a[k]);if(x!=null)e.textContent=x;return e;}
function ls(k,d){try{var v=localStorage.getItem(k);return v==null?d:JSON.parse(v);}catch(_){return d;}}
function lsSet(k,v){try{localStorage.setItem(k,JSON.stringify(v));}catch(_){}}
function br(){return window.AndroidBridge||null;}
function toast(m){try{window.__toast&&window.__toast(m);}catch(_){}}
function track(n,p){try{br()&&br().track&&br().track(n,JSON.stringify(p||{}));}catch(_){}}
function ymd(d){var m=d.getMonth()+1,dd=d.getDate();return d.getFullYear()+"-"+(m<10?"0":"")+m+"-"+(dd<10?"0":"")+dd;}
function r1(x){return Math.round(x*10)/10;}
var PLAY="https://play.google.com/store/apps/details?id=com.hydro.calc";
/* v8.6: store link with install-referrer UTM so Play Console / Firebase show which share brings installs */
function pl(src){try{if(window.__playLink)return window.__playLink(src);}catch(_){}return PLAY;}

var S={
 wxTitle:M("🌦️ الطقس والري الذكي","🌦️ Weather & smart irrigation","🌦️ Météo & irrigation intelligente","🌦️ Clima y riego inteligente","🌦️ 天气与智能灌溉","🌦️ मौसम और स्मार्ट सिंचाई","🌦️ Clima e irrigação inteligente","🌦️ Weer & slim water geven"),
 wxSub:M("بيانات حقيقية لمدينتك (Open-Meteo): التبخر-نتح ET0 والمطر والحرارة، مع تحذيرات الحر والصقيع","Real data for your city (Open-Meteo): ET0, rain and temperature, with heat & frost alerts","Données réelles de votre ville (Open-Meteo) : ET0, pluie, température + alertes chaleur/gel","Datos reales de tu ciudad (Open-Meteo): ET0, lluvia y temperatura + alertas de calor/helada","您所在城市的真实数据（Open-Meteo）：ET0、降雨与气温，并提供高温/霜冻预警","आपके शहर का वास्तविक डेटा (Open-Meteo): ET0, बारिश और तापमान, गर्मी/पाला चेतावनी सहित","Dados reais da sua cidade (Open-Meteo): ET0, chuva e temperatura + alertas de calor/geada","Echte gegevens voor je stad (Open-Meteo): ET0, regen en temperatuur + hitte-/vorstwaarschuwingen"),
 city:M("مدينتك","Your city","Votre ville","Tu ciudad","您的城市","आपका शहर","Sua cidade","Jouw stad"),
 cityPh:M("اكتب اسم المدينة (مثال: الرياض)","Type your city (e.g. Riyadh)","Tapez votre ville (ex. Lyon)","Escribe tu ciudad (ej. Sevilla)","输入城市名（如：北京）","शहर का नाम लिखें (जैसे: जयपुर)","Digite sua cidade (ex.: Campinas)","Typ je stad (bijv. Utrecht)"),
 search:M("🔍 بحث","🔍 Search","🔍 Chercher","🔍 Buscar","🔍 搜索","🔍 खोजें","🔍 Buscar","🔍 Zoeken"),
 change:M("تغيير المدينة","Change city","Changer de ville","Cambiar ciudad","更换城市","शहर बदलें","Mudar cidade","Stad wijzigen"),
 noCity:M("حدّد مدينتك مرة واحدة ليُحسب الري من الطقس الفعلي بدل المعدلات الشهرية.","Set your city once so irrigation uses today's real weather instead of monthly averages.","Indiquez votre ville une fois : l'irrigation utilisera la météo réelle du jour.","Indica tu ciudad una vez para que el riego use el clima real del día.","设置一次城市，灌溉将使用当天真实天气而非月均值。","एक बार शहर चुनें ताकि सिंचाई मासिक औसत के बजाय आज के असली मौसम से गणना हो।","Defina sua cidade uma vez para a irrigação usar o clima real do dia.","Stel één keer je stad in zodat water geven het echte weer van vandaag gebruikt."),
 noRes:M("لم يتم العثور على المدينة","City not found","Ville introuvable","Ciudad no encontrada","未找到城市","शहर नहीं मिला","Cidade não encontrada","Stad niet gevonden"),
 loading:M("جارٍ جلب الطقس…","Fetching weather…","Chargement météo…","Obteniendo clima…","正在获取天气…","मौसम लाया जा रहा है…","Buscando clima…","Weer ophalen…"),
 err:M("تعذّر جلب الطقس — تحقق من الإنترنت","Couldn't fetch weather — check your connection","Météo indisponible — vérifiez la connexion","No se pudo obtener el clima — revisa la conexión","无法获取天气 — 请检查网络","मौसम नहीं मिल सका — इंटरनेट जाँचें","Não foi possível obter o clima — verifique a conexão","Weer niet beschikbaar — controleer je verbinding"),
 errOld:M("تعذّر التحديث — نعرض آخر توقعات محفوظة","Couldn't refresh — showing the last saved forecast","Actualisation impossible — affichage des dernières prévisions enregistrées","No se pudo actualizar — se muestra el último pronóstico guardado","无法刷新 — 显示上次保存的预报","अपडेट नहीं हो सका — आखिरी सहेजा गया पूर्वानुमान दिखाया जा रहा है","Não foi possível atualizar — mostrando a última previsão salva","Vernieuwen mislukt — laatst opgeslagen verwachting wordt getoond"),
 refresh:M("🔄 تحديث","🔄 Refresh","🔄 Actualiser","🔄 Actualizar","🔄 刷新","🔄 ताज़ा करें","🔄 Atualizar","🔄 Vernieuwen"),
 updated:M("آخر تحديث","Updated","Mis à jour","Actualizado","更新于","अपडेट","Atualizado","Bijgewerkt"),
 rain:M("مطر","Rain","Pluie","Lluvia","降雨","बारिश","Chuva","Regen"),
 irrNote:M("✓ الحاسبة تستخدم الآن ET0 الفعلي لليوم: {e} مم/يوم","✓ Calculator now uses today's real ET0: {e} mm/day","✓ Le calcul utilise l'ET0 réelle du jour : {e} mm/j","✓ El cálculo usa la ET0 real de hoy: {e} mm/día","✓ 计算已使用今日真实 ET0：{e} 毫米/天","✓ गणना अब आज का वास्तविक ET0 उपयोग करती है: {e} मिमी/दिन","✓ O cálculo usa a ET0 real de hoje: {e} mm/dia","✓ Berekening gebruikt nu de echte ET0 van vandaag: {e} mm/dag"),
 heat:M("🔥 موجة حر {d}: {v}°م — زد الري 20–30٪، اسقِ فجراً وظلّل الشتلات","🔥 Heat {d}: {v}°C — raise watering 20–30%, water at dawn, shade seedlings","🔥 Canicule {d} : {v}°C — +20–30 % d'eau, arrosez à l'aube, ombrez les plants","🔥 Calor {d}: {v}°C — riega 20–30 % más, al amanecer, y sombrea plántulas","🔥 高温 {d}：{v}°C — 增加灌水 20–30%，清晨浇水，为幼苗遮阴","🔥 गर्मी {d}: {v}°C — सिंचाई 20–30% बढ़ाएँ, सुबह जल्दी पानी दें, पौध को छाया दें","🔥 Calor {d}: {v}°C — aumente a rega 20–30%, regue de madrugada, sombreie mudas","🔥 Hitte {d}: {v}°C — 20–30% meer water, geef bij zonsopgang water, geef zaailingen schaduw"),
 frost:M("❄️ خطر صقيع {d}: {v}°م — غطِّ النباتات ليلاً واسقِ قبل الغروب بساعات","❄️ Frost risk {d}: {v}°C — cover plants at night, water a few hours before sunset","❄️ Risque de gel {d} : {v}°C — couvrez les plantes la nuit, arrosez avant le coucher du soleil","❄️ Riesgo de helada {d}: {v}°C — cubre las plantas de noche y riega horas antes del atardecer","❄️ 霜冻风险 {d}：{v}°C — 夜间覆盖植物，日落前几小时浇水","❄️ पाले का खतरा {d}: {v}°C — रात में पौधे ढकें, सूर्यास्त से कुछ घंटे पहले पानी दें","❄️ Risco de geada {d}: {v}°C — cubra as plantas à noite e regue horas antes do pôr do sol","❄️ Vorstrisico {d}: {v}°C — dek planten 's nachts af, geef water enkele uren voor zonsondergang"),
 rainA:M("🌧️ أمطار {d}: {v} مم — أجّل الري ورش المبيدات والتسميد الورقي","🌧️ Rain {d}: {v} mm — postpone watering, spraying and foliar feeding","🌧️ Pluie {d} : {v} mm — reportez arrosage, traitements et foliaire","🌧️ Lluvia {d}: {v} mm — aplaza riego, pulverizaciones y abono foliar","🌧️ 降雨 {d}：{v} 毫米 — 推迟灌溉、喷药和叶面施肥","🌧️ बारिश {d}: {v} मिमी — सिंचाई, छिड़काव और पत्तियों पर खाद टालें","🌧️ Chuva {d}: {v} mm — adie rega, pulverização e adubação foliar","🌧️ Regen {d}: {v} mm — stel water geven, spuiten en bladvoeding uit"),
 okWx:M("✅ لا تحذيرات طقس للأيام القادمة","✅ No weather alerts for the coming days","✅ Aucune alerte météo ces prochains jours","✅ Sin alertas de clima para los próximos días","✅ 未来几天无天气预警","✅ आने वाले दिनों में कोई मौसम चेतावनी नहीं","✅ Sem alertas de clima nos próximos dias","✅ Geen weerwaarschuwingen voor de komende dagen"),
 today:M("اليوم","today","aujourd'hui","hoy","今天","आज","hoje","vandaag"),
 tmr:M("غداً","tomorrow","demain","mañana","明天","कल","amanhã","morgen"),
 homeAl:M("⚠️ تحذير طقس لمدينتك","⚠️ Weather alert for your city","⚠️ Alerte météo pour votre ville","⚠️ Alerta de clima en tu ciudad","⚠️ 您所在城市的天气预警","⚠️ आपके शहर के लिए मौसम चेतावनी","⚠️ Alerta de clima na sua cidade","⚠️ Weerwaarschuwing voor je stad"),
 home:M("🏠 الرئيسية","🏠 Home","🏠 Accueil","🏠 Inicio","🏠 主页","🏠 होम","🏠 Início","🏠 Start"),
 openIrr:M("💧 احسب الري لمحصولي","💧 Calculate irrigation for my crop","💧 Calculer l'irrigation de ma culture","💧 Calcular riego de mi cultivo","💧 计算我的作物灌溉量","💧 मेरी फसल की सिंचाई गणना","💧 Calcular a rega da minha cultura","💧 Water berekenen voor mijn gewas"),
 et0Exp:M("ET0 = كمية الماء التي يفقدها عشب مرجعي يومياً؛ يُضرب في معامل المحصول Kc لمعرفة حاجة نبتتك.","ET0 = daily water lost by a reference grass; multiplied by the crop factor Kc to get your plant's need.","ET0 = eau perdue par jour par un gazon de référence ; × Kc de la culture = besoin de votre plante.","ET0 = agua que pierde al día un césped de referencia; × Kc del cultivo = necesidad de tu planta.","ET0 = 参考草每日失水量；乘以作物系数 Kc 即为作物需水量。","ET0 = संदर्भ घास द्वारा प्रतिदिन खोया पानी; फसल गुणांक Kc से गुणा करके पौधे की ज़रूरत मिलती है।","ET0 = água perdida por dia por uma grama de referência; × Kc da cultura = necessidade da planta.","ET0 = dagelijks waterverlies van referentiegras; × gewasfactor Kc = behoefte van je plant."),
 // pH / EC log
 phTitle:M("📈 سجل pH و EC","📈 pH & EC log","📈 Journal pH & EC","📈 Registro de pH y EC","📈 pH 与 EC 记录","📈 pH और EC लॉग","📈 Registro de pH e EC","📈 pH- & EC-logboek"),
 phSub:M("سجّل قراءات المحلول يومياً وتابع التغيّر بالرسم، مع تنبيه ونصيحة عند الخروج عن المدى","Log your solution readings daily, see the trend chart, and get advice when out of range","Notez vos mesures chaque jour, suivez la courbe et recevez un conseil hors plage","Registra tus lecturas cada día, mira la gráfica y recibe consejos si salen de rango","每天记录营养液读数，查看趋势图，超出范围时获得建议","रोज़ घोल की रीडिंग दर्ज करें, ग्राफ़ देखें, सीमा से बाहर होने पर सलाह पाएँ","Registre as leituras diariamente, veja o gráfico e receba dicas fora da faixa","Log dagelijks je metingen, bekijk de grafiek en krijg advies buiten bereik"),
 crop:M("المحصول","Crop","Culture","Cultivo","作物","फसल","Cultura","Gewas"),
 ec:M("EC (mS/cm)","EC (mS/cm)","EC (mS/cm)","EC (mS/cm)","EC (mS/cm)","EC (mS/cm)","EC (mS/cm)","EC (mS/cm)"),
 temp:M("حرارة المحلول °م (اختياري)","Solution temp °C (optional)","Temp. solution °C (facultatif)","Temp. solución °C (opcional)","营养液温度 °C（可选）","घोल तापमान °C (वैकल्पिक)","Temp. solução °C (opcional)","Temp. oplossing °C (optioneel)"),
 note:M("ملاحظة (اختياري)","Note (optional)","Note (facultatif)","Nota (opcional)","备注（可选）","नोट (वैकल्पिक)","Nota (opcional)","Notitie (optioneel)"),
 ecHint:M("EC بوحدة mS/cm (= dS/m). إذا كان جهازك يعرض ppm: اقسم على 500 (مقياس 500) أو على 700 (مقياس 700).","EC in mS/cm (= dS/m). If your meter shows ppm: ppm ÷ 500 (500 scale) or ÷ 700 (700 scale).","EC en mS/cm (= dS/m). Si votre appareil affiche des ppm : ppm ÷ 500 (échelle 500) ou ÷ 700 (échelle 700).","EC en mS/cm (= dS/m). Si tu medidor muestra ppm: ppm ÷ 500 (escala 500) o ÷ 700 (escala 700).","EC 单位为 mS/cm（= dS/m）。若仪表显示 ppm：ppm ÷ 500（500 标度）或 ÷ 700（700 标度）。","EC की इकाई mS/cm (= dS/m) है। अगर मीटर ppm दिखाता है: ppm ÷ 500 (500 स्केल) या ÷ 700 (700 स्केल)।","EC em mS/cm (= dS/m). Se o medidor mostra ppm: ppm ÷ 500 (escala 500) ou ÷ 700 (escala 700).","EC in mS/cm (= dS/m). Toont je meter ppm: ppm ÷ 500 (500-schaal) of ÷ 700 (700-schaal)."),
 add:M("➕ حفظ القراءة","➕ Save reading","➕ Enregistrer","➕ Guardar lectura","➕ 保存读数","➕ रीडिंग सहेजें","➕ Salvar leitura","➕ Meting opslaan"),
 target:M("المدى المناسب","Target range","Plage cible","Rango objetivo","目标范围","उचित सीमा","Faixa ideal","Doelbereik"),
 latest:M("آخر قراءة","Latest reading","Dernière mesure","Última lectura","最新读数","नवीनतम रीडिंग","Última leitura","Laatste meting"),
 noData:M("لا توجد قراءات بعد — أضف أول قراءة بالأعلى","No readings yet — add your first one above","Aucune mesure — ajoutez la première ci-dessus","Aún no hay lecturas — añade la primera arriba","暂无读数 — 请在上方添加第一条","अभी कोई रीडिंग नहीं — ऊपर पहली जोड़ें","Sem leituras — adicione a primeira acima","Nog geen metingen — voeg je eerste hierboven toe"),
 history:M("السجل","History","Historique","Historial","历史","इतिहास","Histórico","Geschiedenis"),
 remind:M("📅 ذكّرني بالقياس يومياً (7 أيام)","📅 Remind me to measure daily (7 days)","📅 Rappel quotidien de mesure (7 jours)","📅 Recordarme medir a diario (7 días)","📅 每天提醒我测量（7 天）","📅 रोज़ मापने की याद दिलाएँ (7 दिन)","📅 Lembrar de medir diariamente (7 dias)","📅 Herinner me dagelijks te meten (7 dagen)"),
 reminded:M("تمت إضافة تذكيرات القياس إلى التقويم","Measuring reminders added to the calendar","Rappels ajoutés au calendrier","Recordatorios añadidos al calendario","测量提醒已添加到日历","मापने के रिमाइंडर कैलेंडर में जोड़े गए","Lembretes adicionados ao calendário","Meetherinneringen toegevoegd aan de kalender"),
 measTask:M("📈 قياس pH و EC للمحلول","📈 Measure solution pH & EC","📈 Mesurer pH & EC","📈 Medir pH y EC","📈 测量 pH 和 EC","📈 घोल का pH और EC मापें","📈 Medir pH e EC","📈 pH & EC meten"),
 exportCsv:M("📤 تصدير CSV","📤 Export CSV","📤 Exporter CSV","📤 Exportar CSV","📤 导出 CSV","📤 CSV निर्यात","📤 Exportar CSV","📤 CSV exporteren"),
 invalid:M("تحقّق من القيم: pH بين 0 و14، وEC بين 0 و10 mS/cm، والحرارة بين −5 و60°م","Check the values: pH 0–14, EC 0–10 mS/cm, temperature −5 to 60 °C","Vérifiez les valeurs : pH 0–14, EC 0–10 mS/cm, température −5 à 60 °C","Revisa los valores: pH 0–14, EC 0–10 mS/cm, temperatura −5 a 60 °C","请检查数值：pH 0–14，EC 0–10 mS/cm，温度 −5 至 60 °C","मान जाँचें: pH 0–14, EC 0–10 mS/cm, तापमान −5 से 60 °C","Verifique os valores: pH 0–14, EC 0–10 mS/cm, temperatura −5 a 60 °C","Controleer de waarden: pH 0–14, EC 0–10 mS/cm, temperatuur −5 tot 60 °C"),
 phZero:M("⚠️ pH 0 غير معقول لمحلول مغذٍ — تأكّد من معايرة الجهاز","⚠️ pH 0 is implausible for a nutrient solution — check the meter calibration","⚠️ Un pH de 0 est improbable pour une solution nutritive — vérifiez l'étalonnage","⚠️ Un pH de 0 es improbable en una solución nutritiva — revisa la calibración del medidor","⚠️ 营养液 pH 为 0 不合常理 — 请检查仪表校准","⚠️ पोषक घोल के लिए pH 0 असंभव है — मीटर की कैलिब्रेशन जाँचें","⚠️ pH 0 é improvável para uma solução nutritiva — verifique a calibração do medidor","⚠️ pH 0 is onwaarschijnlijk voor een voedingsoplossing — controleer de kalibratie van de meter"),
 saved:M("✓ تم الحفظ","✓ Saved","✓ Enregistré","✓ Guardado","✓ 已保存","✓ सहेजा गया","✓ Salvo","✓ Opgeslagen"),
 phHi:M("pH مرتفع ({v}) — أضف مخفّض pH (حمض فوسفوريك أو نيتريك) تدريجياً بخطوات 0.2 وأعد القياس بعد 30 دقيقة","pH high ({v}) — add pH-down (phosphoric or nitric acid) gradually in 0.2 steps; re-check after 30 min","pH élevé ({v}) — ajoutez du pH- (acide phosphorique/nitrique) par paliers de 0,2 ; remesurez après 30 min","pH alto ({v}) — añade reductor de pH (ácido fosfórico o nítrico) poco a poco en pasos de 0,2; mide de nuevo a los 30 min","pH 偏高（{v}）— 逐步加入降 pH 剂（磷酸或硝酸），每次 0.2，30 分钟后复测","pH अधिक ({v}) — pH-डाउन (फॉस्फोरिक/नाइट्रिक एसिड) 0.2 के चरणों में धीरे-धीरे डालें; 30 मिनट बाद मापें","pH alto ({v}) — adicione redutor de pH (ácido fosfórico ou nítrico) aos poucos, em passos de 0,2; meça após 30 min","pH hoog ({v}) — voeg geleidelijk pH-min toe (fosfor- of salpeterzuur) in stappen van 0,2; meet na 30 min opnieuw"),
 phLo:M("pH منخفض ({v}) — أضف رافع pH (هيدروكسيد البوتاسيوم) تدريجياً وأعد القياس","pH low ({v}) — add pH-up (potassium hydroxide) gradually and re-check","pH bas ({v}) — ajoutez du pH+ (hydroxyde de potassium) progressivement puis remesurez","pH bajo ({v}) — añade elevador de pH (hidróxido de potasio) poco a poco y vuelve a medir","pH 偏低（{v}）— 逐步加入升 pH 剂（氢氧化钾）后复测","pH कम ({v}) — pH-अप (पोटैशियम हाइड्रॉक्साइड) धीरे-धीरे डालें और फिर मापें","pH baixo ({v}) — adicione elevador de pH (hidróxido de potássio) aos poucos e meça novamente","pH laag ({v}) — voeg geleidelijk pH-plus (kaliumhydroxide) toe en meet opnieuw"),
 ecHi:M("EC مرتفع ({v}) — أضف ماءً نقياً لتخفيف المحلول 10–20٪ وأعد القياس","EC high ({v}) — top up with plain water to dilute 10–20%, then re-check","EC élevée ({v}) — diluez de 10–20 % avec de l'eau pure puis remesurez","EC alta ({v}) — añade agua sola para diluir un 10–20 % y vuelve a medir","EC 偏高（{v}）— 加清水稀释 10–20% 后复测","EC अधिक ({v}) — 10–20% साफ़ पानी मिलाकर घोल पतला करें और फिर मापें","EC alta ({v}) — complete com água pura para diluir 10–20% e meça de novo","EC hoog ({v}) — verdun 10–20% met schoon water en meet opnieuw"),
 ecLo:M("EC منخفض ({v}) — أضف محلولَي A و B بكميات متساوية تدريجياً حتى تصل للمدى","EC low ({v}) — add equal parts of stock A and B gradually until in range","EC basse ({v}) — ajoutez A et B à parts égales progressivement jusqu'à la plage","EC baja ({v}) — añade partes iguales de A y B poco a poco hasta el rango","EC 偏低（{v}）— 按等量逐步添加 A、B 母液至目标范围","EC कम ({v}) — A और B घोल बराबर मात्रा में धीरे-धीरे डालें जब तक सीमा में न आए","EC baixa ({v}) — adicione partes iguais de A e B aos poucos até a faixa","EC laag ({v}) — voeg geleidelijk gelijke delen A en B toe tot binnen bereik"),
 okAll:M("✅ القراءة ضمن المدى المناسب لهذا المحصول","✅ Reading is within the right range for this crop","✅ Mesure dans la bonne plage pour cette culture","✅ La lectura está en el rango correcto para este cultivo","✅ 读数处于该作物适宜范围","✅ रीडिंग इस फसल की उचित सीमा में है","✅ Leitura dentro da faixa ideal para esta cultura","✅ Meting binnen het juiste bereik voor dit gewas"),
 drift:M("⚠️ تغيّر pH بأكثر من 0.5 منذ القراءة السابقة — افحص نظافة الخزان والجذور وتهوية المحلول","⚠️ pH moved more than 0.5 since last reading — check tank hygiene, roots and aeration","⚠️ Le pH a varié de plus de 0,5 — vérifiez bac, racines et aération","⚠️ El pH cambió más de 0,5 — revisa limpieza del tanque, raíces y aireación","⚠️ pH 较上次变化超过 0.5 — 检查水箱卫生、根系和增氧","⚠️ pH पिछली रीडिंग से 0.5 से ज़्यादा बदला — टंकी की सफ़ाई, जड़ें और वातन जाँचें","⚠️ O pH mudou mais de 0,5 — verifique higiene do tanque, raízes e aeração","⚠️ pH meer dan 0,5 veranderd — controleer tankhygiëne, wortels en beluchting"),
 hotSol:M("🌡️ حرارة المحلول {v}°م مرتفعة — الأكسجين الذائب ينخفض وخطر تعفن الجذور يزيد؛ برّد الخزان أو ظلّله (المثالي 18–22°م)","🌡️ Solution at {v}°C is warm — less dissolved oxygen, root-rot risk; cool or shade the tank (ideal 18–22°C)","🌡️ Solution à {v}°C trop chaude — moins d'oxygène, risque de pourriture ; refroidissez (idéal 18–22 °C)","🌡️ Solución a {v}°C caliente — menos oxígeno, riesgo de pudrición; enfría el tanque (ideal 18–22 °C)","🌡️ 营养液 {v}°C 偏热 — 溶氧下降、易烂根；请降温或遮阴（理想 18–22°C）","🌡️ घोल {v}°C गर्म है — ऑक्सीजन कम, जड़ सड़न का खतरा; टंकी ठंडी करें (आदर्श 18–22°C)","🌡️ Solução a {v}°C quente — menos oxigênio, risco de podridão; resfrie o tanque (ideal 18–22 °C)","🌡️ Oplossing {v}°C te warm — minder zuurstof, kans op wortelrot; koel de tank (ideaal 18–22 °C)"),
 chartPh:M("pH — آخر 30 قراءة","pH — last 30 readings","pH — 30 dernières mesures","pH — últimas 30 lecturas","pH — 最近 30 次","pH — पिछली 30 रीडिंग","pH — últimas 30 leituras","pH — laatste 30 metingen"),
 chartEc:M("EC — آخر 30 قراءة","EC — last 30 readings","EC — 30 dernières mesures","EC — últimas 30 lecturas","EC — 最近 30 次","EC — पिछली 30 रीडिंग","EC — últimas 30 leituras","EC — laatste 30 metingen"),
 del:M("حذف","Delete","Suppr.","Borrar","删除","हटाएँ","Excluir","Wissen"),
 // share + follow-up + review
 share:M("📤 مشاركة النتيجة","📤 Share result","📤 Partager","📤 Compartir resultado","📤 分享结果","📤 परिणाम साझा करें","📤 Compartilhar","📤 Resultaat delen"),
 followUp:M("🔁 ذكّرني بإعادة الفحص بعد 7 أيام","🔁 Remind me to re-check in 7 days","🔁 Me rappeler de revérifier dans 7 jours","🔁 Recordarme revisar en 7 días","🔁 7 天后提醒我复查","🔁 7 दिन बाद दोबारा जाँचने की याद दिलाएँ","🔁 Lembrar de reavaliar em 7 dias","🔁 Herinner me over 7 dagen opnieuw te controleren"),
 fuAdded:M("✓ تذكير إعادة الفحص يوم {d} — صوّر نفس النبتة وقارن","✓ Re-check reminder set for {d} — photograph the same plant and compare","✓ Rappel le {d} — photographiez la même plante et comparez","✓ Recordatorio el {d} — fotografía la misma planta y compara","✓ 已设置 {d} 复查提醒 — 拍摄同一株植物进行对比","✓ {d} को दोबारा जाँच का रिमाइंडर — उसी पौधे की फोटो लेकर तुलना करें","✓ Lembrete em {d} — fotografe a mesma planta e compare","✓ Herinnering op {d} — fotografeer dezelfde plant en vergelijk"),
 fuTask:M("🔁 أعد فحص {c}: {x} — هل تحسّن؟","🔁 Re-check {c}: {x} — improving?","🔁 Revérifier {c} : {x} — amélioration ?","🔁 Revisar {c}: {x} — ¿mejora?","🔁 复查 {c}：{x} — 是否好转？","🔁 {c} दोबारा जाँचें: {x} — सुधार हुआ?","🔁 Reavaliar {c}: {x} — melhorou?","🔁 Controleer {c} opnieuw: {x} — beter?"),
 conf:M("الثقة","Confidence","Confiance","Confianza","置信度","विश्वास","Confiança","Zekerheid"),
 sev:M("الشدة","Severity","Gravité","Gravedad","严重度","गंभीरता","Gravidade","Ernst"),
 todayDo:M("افعل اليوم","Do today","À faire aujourd'hui","Hoy","今天就做","आज करें","Faça hoje","Vandaag doen"),
 organic:M("علاج عضوي","Organic","Bio","Orgánico","有机防治","जैविक","Orgânico","Biologisch"),
 chem:M("علاج كيميائي","Chemical","Chimique","Químico","化学防治","रासायनिक","Químico","Chemisch"),
 aiDx:M("تشخيص ذكي للنبات","AI plant diagnosis","Diagnostic IA de la plante","Diagnóstico IA de la planta","AI 植物诊断","AI पौध निदान","Diagnóstico IA da planta","AI-plantdiagnose"),
 getApp:M("حمّل التطبيق مجاناً من Google Play","Get the free app on Google Play","Application gratuite sur Google Play","App gratis en Google Play","在 Google Play 免费下载","Google Play पर मुफ़्त ऐप","App grátis no Google Play","Gratis app in Google Play"),
 shareTxt:M("🩺 تشخيص نبتتي عبر Hydroponic Smart Assistant:\n{c} — {x} ({p}%)\nجرّبه مجاناً:","🩺 My plant diagnosis with Hydroponic Smart Assistant:\n{c} — {x} ({p}%)\nTry it free:","🩺 Diagnostic de ma plante avec Hydroponic Smart Assistant :\n{c} — {x} ({p} %)\nEssayez-le :","🩺 Diagnóstico de mi planta con Hydroponic Smart Assistant:\n{c} — {x} ({p}%)\nPruébalo gratis:","🩺 我用 Hydroponic Smart Assistant 诊断植物：\n{c} — {x}（{p}%）\n免费试用：","🩺 Hydroponic Smart Assistant से मेरे पौधे का निदान:\n{c} — {x} ({p}%)\nमुफ़्त आज़माएँ:","🩺 Diagnóstico da minha planta com o Hydroponic Smart Assistant:\n{c} — {x} ({p}%)\nExperimente grátis:","🩺 Mijn plantdiagnose met Hydroponic Smart Assistant:\n{c} — {x} ({p}%)\nProbeer gratis:")
};
window.__toolsS=S;

/* ================= WEATHER ================= */
var WXK="hydro_wx",LOCK="hydro_wxloc";
function wxLoc(){var l=ls(LOCK,null);return (l&&l.lat!=null&&l.lon!=null&&isFinite(+l.lat)&&isFinite(+l.lon))?l:null;}
function wxCache(){return ls(WXK,null);}
/* forecast values may be null in Open-Meteo JSON: keep null (never turn a missing value into 0 °C = false frost alert) */
function nv(v){return (v==null||v===""||!isFinite(+v))?null:+v;}
function rd(v){return v==null?"—":String(Math.round(v));}
function r1s(v){return v==null?"—":String(r1(v));}
/* GET JSON with timeout (AbortController when available); ok(json) or bad() is called exactly once */
function getJson(u,ms,ok,bad){var ac=null,fin=false,tm=null;try{ac=(typeof AbortController!=="undefined")?new AbortController():null;}catch(_){ac=null;}
 function fail(){if(fin)return;fin=true;clearTimeout(tm);try{bad();}catch(_){}}
 tm=setTimeout(function(){try{if(ac)ac.abort();}catch(_){}fail();},ms);
 try{fetch(u,ac?{signal:ac.signal}:{}).then(function(r){if(!r.ok)throw 0;return r.json();}).then(function(j){if(fin)return;fin=true;clearTimeout(tm);try{ok(j);}catch(_){}}).catch(fail);}catch(_){fail();}}
function wxFresh(c){var a=c?Date.now()-(+c.t||0):0;return !!(c&&c.days&&c.days.length&&c.days[0]&&("rh" in c.days[0])&&a>-6e5&&a<3*3600e3);}
function wxToday(){var c=wxCache();if(!c||!Array.isArray(c.days)||!(Date.now()-(+c.t||0)<36*3600e3))return null;var t=ymd(new Date());for(var i=0;i<c.days.length;i++)if(c.days[i]&&c.days[i].d===t)return c.days[i];return null;}
window.__wxToday=wxToday;
function dayLbl(ds){var t=ymd(new Date()),tm=new Date();tm.setDate(tm.getDate()+1);if(ds===t)return T(S.today);if(ds===ymd(tm))return T(S.tmr);try{var p=ds.split("-");return new Date(+p[0],+p[1]-1,+p[2]).toLocaleDateString(L()==="zh"?"zh-CN":L(),{weekday:"long"});}catch(_){return ds;}}
function alerts(c){var out=[];if(!c||!c.days)return out;var t=ymd(new Date());c.days.forEach(function(d){if(!d||d.d<t)return;if(d.tmax!=null&&d.tmax>=38)out.push({k:"heat",d:d.d,v:Math.round(d.tmax)});if(d.tmin!=null&&d.tmin<=2)out.push({k:"frost",d:d.d,v:Math.round(d.tmin)});if(d.rain!=null&&d.rain>=15)out.push({k:"rainA",d:d.d,v:Math.round(d.rain)});});return out;}
function alertTxt(a){return T(S[a.k]).replace("{d}",dayLbl(a.d)).replace("{v}",String(a.v));}
window.__wxAlerts=function(){return alerts(wxCache()).map(alertTxt);};
function pushNative(c){try{var b=br();if(!b||!b.setWeather||!c)return;var loc=wxLoc();var td=null,t=ymd(new Date());(c.days||[]).forEach(function(d){if(!td&&d&&d.d>=t)td=d;});
 var line=td?("🌡️ "+rd(td.tmax)+"°/"+rd(td.tmin)+"° · 💧ET0 "+r1s(td.et0)+" mm · 🌧️ "+r1s(td.rain)+" mm"):"";var al=alerts(c).map(alertTxt);
 b.setWeather(JSON.stringify({lat:loc?loc.lat:null,lon:loc?loc.lon:null,name:loc?loc.name:"",line:line,alert:al[0]||""}));}catch(_){}}
var wxQ=null;/* callbacks waiting for the forecast request in flight (one network request at a time) */
function fetchWx(cb){var loc=wxLoc();if(!loc){cb&&cb(null,"noloc");return;}
 if(wxQ){if(cb)wxQ.push(cb);return;}wxQ=cb?[cb]:[];
 function done(c,er){var q=wxQ||[];wxQ=null;q.forEach(function(f){try{f(c,er);}catch(_){}});}
 var u="https://api.open-meteo.com/v1/forecast?latitude="+loc.lat+"&longitude="+loc.lon+"&daily=et0_fao_evapotranspiration,precipitation_sum,temperature_2m_max,temperature_2m_min,precipitation_probability_max,relative_humidity_2m_mean,relative_humidity_2m_max&timezone=auto&forecast_days=5";
 getJson(u,15000,function(j){try{var d=j&&j.daily;if(!d||!Array.isArray(d.time)||!d.time.length){done(null,"err");return;}function A(k){return Array.isArray(d[k])?d[k]:[];}
  var days=d.time.map(function(t,i){return {d:String(t),et0:nv(A("et0_fao_evapotranspiration")[i]),rain:nv(A("precipitation_sum")[i]),tmax:nv(A("temperature_2m_max")[i]),tmin:nv(A("temperature_2m_min")[i]),pp:nv(A("precipitation_probability_max")[i]),rh:nv(A("relative_humidity_2m_mean")[i]),rhx:nv(A("relative_humidity_2m_max")[i])};});
  var c={t:Date.now(),days:days};lsSet(WXK,c);pushNative(c);track("wx_fetch",{n:loc.name});done(c);}catch(_){done(null,"err");}},function(){done(null,"err");});}
window.__wxRefresh=function(cb){var c=wxCache();if(wxFresh(c)){pushNative(c);cb&&cb(c);return;}fetchWx(cb);};
function geocode(q,cb){getJson("https://geocoding-api.open-meteo.com/v1/search?count=6&format=json&language="+L()+"&name="+encodeURIComponent(q),12000,function(j){cb((j&&Array.isArray(j.results))?j.results:[]);},function(){cb(null);});}
function cityPicker(box,done){box.innerHTML="";var row=el("div",{style:"display:flex;gap:6px;margin-top:6px"});var inp=el("input",{type:"text",placeholder:T(S.cityPh),"class":"tlin",style:"flex:1"});var b=el("button",{"class":"tlbtn s"},T(S.search));row.appendChild(inp);row.appendChild(b);box.appendChild(row);var res=el("div");box.appendChild(res);
 var seq=0;function go(){var q=(inp.value||"").trim();if(q.length<2)return;var my=++seq;res.textContent=T(S.loading);geocode(q,function(a){if(my!==seq)return;res.innerHTML="";if(a===null){res.textContent=T(S.err);return;}a=a.filter(function(p){return p&&p.name&&isFinite(+p.latitude)&&isFinite(+p.longitude);});if(!a.length){res.textContent=T(S.noRes);return;}var cm=L()==="ar"?"، ":L()==="zh"?"，":", ";a.forEach(function(p){var o=el("button",{"class":"tlpick"},p.name+(p.admin1&&p.admin1!==p.name?cm+p.admin1:"")+(p.country?" — "+p.country:""));o.addEventListener("click",function(){lsSet(LOCK,{name:String(p.name),lat:Math.round(p.latitude*1000)/1000,lon:Math.round(p.longitude*1000)/1000,cc:p.country_code||""});lsSet(WXK,null);track("wx_city",{cc:p.country_code||""});done();});res.appendChild(o);});});}
 b.addEventListener("click",go);inp.addEventListener("keydown",function(e){if(e.key==="Enter")go();});}
/* weather card: used inside Plant Care irrigation (onChange re-runs the calculator) and in the weather overlay */
var wxForce=false;/* set by "Refresh": re-fetch now but keep the saved forecast on screen (and in storage) if the network fails */
window.__wxCard=function(host,onChange,full){host.innerHTML="";ensureCss();var card=el("div",{"class":"tlcard"});host.appendChild(card);
 if(!full)card.appendChild(el("div",{"class":"tlh"},T(S.wxTitle)));var loc=wxLoc();
 if(!loc){card.appendChild(el("div",{"class":"tlnote"},T(S.noCity)));var pb=el("div");card.appendChild(pb);cityPicker(pb,function(){window.__wxCard(host,onChange,full);});return;}
 var top=el("div",{style:"display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"});top.appendChild(el("div",{style:"font-weight:800"},"📍 "+loc.name));var bx=el("div",{style:"display:flex;gap:6px"});var rf=el("button",{"class":"tlmini"},T(S.refresh));var ch=el("button",{"class":"tlmini"},T(S.change));bx.appendChild(rf);bx.appendChild(ch);top.appendChild(bx);card.appendChild(top);
 var pk=el("div");card.appendChild(pk);
 /* the saved city stays active until a new one is picked (leaving the picker keeps the old city, widget and alerts consistent) */
 ch.addEventListener("click",function(){if(pk.firstChild){pk.innerHTML="";return;}cityPicker(pk,function(){window.__wxCard(host,onChange,full);});try{pk.querySelector("input").focus();}catch(_){}});
 rf.addEventListener("click",function(){wxForce=true;window.__wxCard(host,onChange,full);});
 var c=wxCache(),force=wxForce;wxForce=false;if(c&&!Array.isArray(c.days))c=null;
 var t=ymd(new Date()),g=el("div",{"class":"tlwx"}),fut=c?c.days.filter(function(d){return d&&d.d>=t;}):[];
 if(force||!wxFresh(c)){var ld=el("div",{"class":"tlnote"},T(S.loading));card.appendChild(ld);var hadOld=fut.length>0;fetchWx(function(nc){if(!nc){ld.className="tlwarn";ld.textContent=T(hadOld?S.errOld:S.err);return;}window.__wxCard(host,onChange,full);onChange&&onChange();});if(!c)return;}
 if(fut.length){fut.slice(0,full?5:3).forEach(function(d){var x=el("div",{"class":"tlday"});x.appendChild(el("div",{"class":"n"},dayLbl(d.d)));x.appendChild(el("div",{"class":"b",dir:"ltr"},rd(d.tmax)+"° / "+rd(d.tmin)+"°"));x.appendChild(el("div",{"class":"s"},"ET0 "+r1s(d.et0)+" mm"));x.appendChild(el("div",{"class":"s"},"🌧️ "+r1s(d.rain)+" mm"+(d.pp!=null?" · "+Math.round(d.pp)+"%":"")));g.appendChild(x);});
  card.appendChild(g);
  var td=wxToday();if(td&&td.et0>0&&!full)card.appendChild(el("div",{"class":"tlok"},T(S.irrNote).replace("{e}",String(r1(td.et0)))));
  var al=alerts(c);if(al.length)al.slice(0,4).forEach(function(a){card.appendChild(el("div",{"class":"tlwarn"},alertTxt(a)));});else card.appendChild(el("div",{"class":"tlok"},T(S.okWx)));}
 if(full)card.appendChild(el("div",{"class":"tlnote",style:"margin-top:8px"},T(S.et0Exp)));
 if(isFinite(+c.t)&&+c.t>0)try{var ud=new Date(+c.t),uds=ymd(ud)===t?ud.toLocaleTimeString(L(),{hour:"2-digit",minute:"2-digit"}):ud.toLocaleString(L(),{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"});card.appendChild(el("div",{"class":"tlnote",style:"margin-top:6px;font-size:11px"},T(S.updated)+": "+uds+" · Open-Meteo.com"));}catch(_){}
};
/* small home alert row (only when an alert exists) */
window.__wxHomeCard=function(host){try{var c=wxCache();if(!c||!wxLoc()||!(Date.now()-(+c.t||0)<36*3600e3))return;var al=alerts(c);var R=riskList(c),hr=R?R.list.filter(function(x){return x.lv>=2;}):[];if(!al.length&&!hr.length)return;ensureCss();var d=el("div",{"class":"tlhome"});if(al.length){d.appendChild(el("div",{style:"font-weight:900;margin-bottom:4px"},T(S.homeAl)));d.appendChild(el("div",null,alertTxt(al[0])));}if(hr.length)d.appendChild(el("div",{style:"font-weight:800;margin-top:"+(al.length?"6px":"0")},T(RK.home).replace("{n}",hr.slice(0,2).map(function(x){return T(x.r.n);}).join(" · "))));d.addEventListener("click",function(){window.__openWeather();});host.appendChild(d);}catch(_){}};

/* ================= OVERLAY SHELL ================= */
var ov=null,wrap=null,cssDone=false;
function ensureCss(){if(cssDone)return;cssDone=true;var st=el("style");st.textContent=
".toolov{position:fixed;inset:0;z-index:99993;background:linear-gradient(180deg,#F3F9F1,#E8F2E4);color:#132520;overflow:auto;display:none;font-family:inherit}.toolov.on{display:block}[data-theme=\"dark\"] .toolov{background:linear-gradient(180deg,#0a2618,#071c12);color:#eaf7f1}"+
".toolw{max-width:640px;margin:0 auto;padding:16px 16px 88px}.toolw h2{margin:.2em 0 4px}"+
".tlcard{background:#fff;border:1px solid #E3ECE3;border-radius:16px;box-shadow:0 2px 10px rgba(30,70,30,.06);padding:14px 16px;margin:12px 0;color:#132520}[data-theme=\"dark\"] .tlcard{background:#0f2f1f;border-color:#1f4a34;color:#eaf7f1}"+
".tlh{font-weight:900;font-size:16px;margin-bottom:6px}.tlnote{font-size:12.5px;color:#5E7169;line-height:1.6}[data-theme=\"dark\"] .tlnote{color:#9fb8ad}"+
".tlin,.toolov select{width:100%;box-sizing:border-box;padding:10px;border-radius:10px;border:1px solid #D5E3D5;background:#fff;color:#132520;font-size:14px}[data-theme=\"dark\"] .tlin,[data-theme=\"dark\"] .toolov select{background:#0f2f1f;color:#eaf7f1;border-color:#1f4a34}"+
".tlbtn{width:100%;padding:12px;border:none;border-radius:12px;background:#2FA25E;color:#fff;font-weight:800;font-size:14.5px;margin-top:10px;cursor:pointer}.tlbtn.s{width:auto;margin-top:0;padding:10px 14px}.tlbtn.g{background:transparent;border:1px solid #B9CDBB;color:inherit}"+
".tlmini{border:1px solid #B9CDBB;background:transparent;color:inherit;border-radius:10px;padding:5px 10px;font-weight:800;font-size:12px;cursor:pointer}"+
".tlpick{display:block;width:100%;text-align:start;margin-top:6px;padding:10px;border-radius:10px;border:1px solid #D5E3D5;background:#F7FBF6;color:inherit;font-weight:700;cursor:pointer}[data-theme=\"dark\"] .tlpick{background:#123324;border-color:#1f4a34}"+
".tlwx{display:grid;grid-template-columns:repeat(auto-fit,minmax(92px,1fr));gap:8px;margin-top:10px}.tlday{background:#EEF6EE;border-radius:12px;padding:8px;text-align:center}[data-theme=\"dark\"] .tlday{background:#153826}.tlday .n{font-weight:800;font-size:12.5px}.tlday .n::first-letter{text-transform:uppercase}.tlday .b{font-weight:900;font-size:16px;margin:2px 0}.tlday .s{font-size:11.5px;color:#4b6358;direction:ltr;unicode-bidi:isolate}[data-theme=\"dark\"] .tlday .s{color:#a9c4b8}"+
".tlwarn{margin-top:8px;padding:9px 11px;border-radius:10px;background:#FFF4E5;color:#7a4300;font-weight:700;font-size:13px;line-height:1.55}[data-theme=\"dark\"] .tlwarn{background:#3a2a10;color:#ffd79a}"+
".tlok{margin-top:8px;padding:9px 11px;border-radius:10px;background:#E8F6EC;color:#1f6b3d;font-weight:700;font-size:13px;line-height:1.55}[data-theme=\"dark\"] .tlok{background:#123d26;color:#a6e3bd}"+
".tlhome{margin-top:12px;padding:12px 14px;border-radius:14px;background:linear-gradient(135deg,#FFF1DC,#FFE4C2);color:#6b3a00;font-size:13.5px;line-height:1.55;cursor:pointer;box-shadow:0 2px 8px rgba(120,70,0,.12)}[data-theme=\"dark\"] .tlhome{background:linear-gradient(135deg,#3a2a10,#2c1f0a);color:#ffd79a}"+
".tlhomebtn{display:inline-flex;align-items:center;gap:6px;border:none;background:#fff;color:#132520;font-weight:800;border-radius:12px;padding:8px 14px;margin-bottom:10px;cursor:pointer;box-shadow:0 2px 8px rgba(30,70,30,.08)}[data-theme=\"dark\"] .tlhomebtn{background:#153826;color:#eaf7f1}"+
".tlgrid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.tlgrid label{font-size:12.5px;font-weight:800;display:block;margin-bottom:4px}"+
".tlrow{display:flex;justify-content:space-between;gap:8px;align-items:center;padding:8px 0;border-bottom:1px dashed #E3ECE3;font-size:13px}[data-theme=\"dark\"] .tlrow{border-color:#1f4a34}.tlrow:last-child{border-bottom:none}.tlrow b{font-size:14px}.tlbad{color:#D14343}.tlgood{color:#2FA25E}"+
".tlchart{width:100%;height:auto;display:block;margin-top:6px}"+
".dzov .note{color:#cfe2dd !important;opacity:1 !important}";
document.head.appendChild(st);}
function shell(){ensureCss();if(ov)return;ov=el("div",{"class":"toolov"});wrap=el("div",{"class":"toolw"});ov.appendChild(wrap);document.body.appendChild(ov);}
function header(title,sub){wrap.innerHTML="";idCur=false;var hb=el("button",{"class":"tlhomebtn"},T(S.home));hb.addEventListener("click",function(){ov.classList.remove("on");try{window.__goHome&&window.__goHome();}catch(_){}});wrap.appendChild(hb);wrap.appendChild(el("h2",null,T(title)));wrap.appendChild(el("div",{"class":"tlnote"},T(sub)));}
function show(){ov.classList.add("on");ov.scrollTop=0;}

window.__openWeather=function(){shell();header(S.wxTitle,S.wxSub);var host=el("div");wrap.appendChild(host);var rk=el("div");window.__wxCard(host,function(){window.__riskCard(rk);},true);wrap.appendChild(rk);window.__riskCard(rk);
 var b=el("button",{"class":"tlbtn"},T(S.openIrr));b.addEventListener("click",function(){ov.classList.remove("on");try{window.__openCare&&window.__openCare();}catch(_){}});wrap.appendChild(b);show();track("open_weather",{});};

/* ================= pH / EC LOG ================= */
var PHK="hydro_phlog",PHC="hydro_phcrop";
var CR=[
 ["gen",M("عام (معظم الخضار)","General (most vegetables)","Général (la plupart des légumes)","General (mayoría de hortalizas)","通用（多数蔬菜）","सामान्य (अधिकांश सब्ज़ियाँ)","Geral (maioria das hortaliças)","Algemeen (meeste groenten)"),1.2,2.4,5.5,6.5],
 ["lettuce",M("خس","Lettuce","Laitue","Lechuga","生菜","लेट्यूस","Alface","Sla"),0.8,1.2,5.5,6.5],
 ["tomato",M("طماطم","Tomato","Tomate","Tomate","番茄","टमाटर","Tomate","Tomaat"),2.0,3.5,5.5,6.5],
 ["cucumber",M("خيار","Cucumber","Concombre","Pepino","黄瓜","खीरा","Pepino","Komkommer"),1.7,2.5,5.5,6.0],
 ["pepper",M("فلفل","Pepper","Poivron","Pimiento","甜椒","शिमला मिर्च","Pimentão","Paprika"),1.8,2.8,5.5,6.5],
 ["strawberry",M("فراولة","Strawberry","Fraise","Fresa","草莓","स्ट्रॉबेरी","Morango","Aardbei"),1.0,2.0,5.5,6.2],
 ["basil",M("ريحان","Basil","Basilic","Albahaca","罗勒","तुलसी (बेसिल)","Manjericão","Basilicum"),1.0,1.6,5.5,6.5],
 ["spinach",M("سبانخ","Spinach","Épinard","Espinaca","菠菜","पालक","Espinafre","Spinazie"),1.8,2.3,5.5,6.6],
 ["mint",M("نعناع","Mint","Menthe","Menta","薄荷","पुदीना","Hortelã","Munt"),2.0,2.4,5.5,6.0],
 ["kale",M("كيل","Kale","Chou kale","Col rizada","羽衣甘蓝","केल","Couve","Boerenkool"),1.2,2.0,5.5,6.5],
 ["eggplant",M("باذنجان","Eggplant","Aubergine","Berenjena","茄子","बैंगन","Berinjela","Aubergine"),2.5,3.5,5.5,6.5],
 ["celery",M("كرفس","Celery","Céleri","Apio","芹菜","सेलरी (अजमोद)","Aipo","Selderij"),1.8,2.4,6.0,6.5],
 ["parsley",M("بقدونس","Parsley","Persil","Perejil","欧芹","पार्सले","Salsa","Peterselie"),0.8,1.8,5.5,6.0],
 ["broccoli",M("بروكلي","Broccoli","Brocoli","Brócoli","西兰花","ब्रोकली","Brócolis","Broccoli"),1.8,2.6,6.0,6.8],
 ["cauliflower",M("قرنبيط","Cauliflower","Chou-fleur","Coliflor","花椰菜","फूलगोभी","Couve-flor","Bloemkool"),1.8,2.6,6.0,6.8],
 ["pakchoi",M("ملفوف صيني (باك تشوي)","Pak choi","Pak-choï","Pak choi","小白菜","पाक चोई","Pak choi","Paksoi"),1.5,2.2,6.0,7.0],
 ["chard",M("سلق","Swiss chard","Blette","Acelga","莙荙菜（瑞士甜菜）","स्विस चार्ड","Acelga","Snijbiet"),1.5,2.3,6.0,7.0],
 ["coriander",M("كزبرة","Coriander (cilantro)","Coriandre","Cilantro","香菜（芫荽）","धनिया","Coentro","Koriander"),1.2,1.8,6.2,6.8],
 ["arugula",M("جرجير","Arugula (rocket)","Roquette","Rúcula","芝麻菜","रॉकेट (अरुगुला)","Rúcula","Rucola"),1.2,1.8,6.0,7.0],
 ["dill",M("شبت","Dill","Aneth","Eneldo","莳萝","सोआ (डिल)","Endro","Dille"),1.2,1.8,5.8,6.8],
 ["oregano",M("زعتر بري (أوريغانو)","Oregano","Origan","Orégano","牛至（披萨草）","ओरेगैनो","Orégano","Oregano"),1.2,1.8,6.0,7.5],
 ["sage",M("مريمية (ميرمية)","Sage","Sauge","Salvia","鼠尾草","सेज","Sálvia","Salie"),1.2,1.8,6.0,7.0],
 ["peas",M("بازلاء","Peas","Petits pois","Guisantes","豌豆","मटर","Ervilha","Erwten"),1.6,2.2,6.0,7.0],
 ["blueberry",M("توت أزرق","Blueberry","Myrtille","Arándano","蓝莓","ब्लूबेरी","Mirtilo","Blauwe bes"),1.2,1.8,4.5,5.5],
 ["raspberry",M("توت العليق (رازبيري)","Raspberry","Framboisier","Frambuesa","树莓（覆盆子）","रसभरी","Framboesa","Framboos"),1.2,1.8,5.8,6.5]];
function crById(id){for(var i=0;i<CR.length;i++)if(CR[i][0]===id)return CR[i];return CR[0];}
function logAll(){var a=ls(PHK,[]);return Array.isArray(a)?a:[];}
function advice(e,prev){var c=crById(e.c),out=[];
 if(e.ph!=null){if(e.ph>c[5])out.push({b:1,t:T(S.phHi).replace("{v}",e.ph)});else if(e.ph<c[4])out.push({b:1,t:T(S.phLo).replace("{v}",e.ph)});}
 if(e.ec!=null){if(e.ec>c[3])out.push({b:1,t:T(S.ecHi).replace("{v}",e.ec)});else if(e.ec<c[2])out.push({b:1,t:T(S.ecLo).replace("{v}",e.ec)});}
 if(e.tp!=null&&e.tp>=26)out.push({b:1,t:T(S.hotSol).replace("{v}",e.tp)});
 if(prev&&prev.ph!=null&&e.ph!=null&&Math.abs(prev.ph-e.ph)>0.5)out.push({b:1,t:T(S.drift)});
 if(!out.length)out.push({b:0,t:T(S.okAll)});return out;}
function chart(pts,lo,hi,key,title,col){var W=600,H=220,PL=58,PR=18,PT=22,PB=40,vals=pts.map(function(p){return p[key];}).filter(function(v){return v!=null&&isFinite(v);});var box=el("div");
 if(!vals.length){return box;}box.appendChild(el("div",{style:"font-weight:800;font-size:13px;margin-top:8px"},T(title)));var mn=Math.min(lo,Math.min.apply(null,vals)),mx=Math.max(hi,Math.max.apply(null,vals));var pad=(mx-mn)*0.15||0.5;mn-=pad;mx+=pad;
 var ns="http://www.w3.org/2000/svg",svg=document.createElementNS(ns,"svg");svg.setAttribute("viewBox","0 0 "+W+" "+H);svg.setAttribute("class","tlchart");svg.setAttribute("direction","ltr");svg.setAttribute("role","img");svg.setAttribute("aria-label",T(title));
 /* viewBox is ~2x the on-screen width on phones: font 22 ≈ 11 px */
 function Y(v){return PT+(1-(v-mn)/(mx-mn))*(H-PT-PB);}
 function mk(n,a){var e=document.createElementNS(ns,n);for(var k in a)e.setAttribute(k,a[k]);svg.appendChild(e);return e;}
 mk("rect",{x:PL,y:Y(hi),width:W-PL-PR,height:Math.max(1,Y(lo)-Y(hi)),fill:col,"fill-opacity":"0.12",rx:6});
 [lo,hi].forEach(function(v){mk("line",{x1:PL,x2:W-PR,y1:Y(v),y2:Y(v),stroke:col,"stroke-opacity":"0.5","stroke-dasharray":"8 6","stroke-width":"2"});var tx=mk("text",{x:PL-8,y:Y(v)+7,"font-size":"22","text-anchor":"end",fill:"#6b7f76"});tx.textContent=String(v);});
 var n=pts.length,xs=function(i){return n<=1?(PL+W-PR)/2:PL+i*(W-PL-PR)/(n-1);};var d="";pts.forEach(function(p,i){if(p[key]==null)return;d+=(d?"L":"M")+xs(i).toFixed(1)+","+Y(p[key]).toFixed(1);});
 if(d)mk("path",{d:d,fill:"none",stroke:col,"stroke-width":"4","stroke-linejoin":"round","stroke-linecap":"round"});
 pts.forEach(function(p,i){if(p[key]==null)return;var bad=p[key]<lo||p[key]>hi;mk("circle",{cx:xs(i),cy:Y(p[key]),r:bad?9:7,fill:bad?"#D14343":col,stroke:"#fff","stroke-width":"2.5"});});
 if(n){var f=new Date(pts[0].t),l=new Date(pts[n-1].t);var t1=mk("text",{x:PL,y:H-8,"font-size":"20",fill:"#6b7f76"});t1.textContent=(f.getDate())+"/"+(f.getMonth()+1);if(n>1){var t2=mk("text",{x:W-PR,y:H-8,"font-size":"20","text-anchor":"end",fill:"#6b7f76"});t2.textContent=(l.getDate())+"/"+(l.getMonth()+1);}}
 box.appendChild(svg);return box;}
function renderPh(){header(S.phTitle,S.phSub);var cid=ls(PHC,"gen");
 var f=el("div",{"class":"tlcard"});f.appendChild(el("label",{style:"font-weight:800;font-size:12.5px"},T(S.crop)));var sel=el("select");CR.forEach(function(c){var o=el("option",{value:c[0]},T(c[1])+"  (EC "+c[2]+"–"+c[3]+" · pH "+c[4]+"–"+c[5]+")");if(c[0]===cid)o.selected=true;sel.appendChild(o);});f.appendChild(sel);
 sel.addEventListener("change",function(){lsSet(PHC,sel.value);renderPh();});
 var g=el("div",{"class":"tlgrid",style:"margin-top:10px"});function fld(lbl,ph){var d=el("div");d.appendChild(el("label",null,lbl));var i=el("input",{type:"number",step:"0.1",inputmode:"decimal","class":"tlin",placeholder:ph});d.appendChild(i);g.appendChild(d);return i;}
 var iPh=fld("pH","6.0"),iEc=fld(T(S.ec),"1.8"),iTp=fld(T(S.temp),"20");var nd=el("div");nd.appendChild(el("label",null,T(S.note)));var iNt=el("input",{type:"text","class":"tlin"});nd.appendChild(iNt);g.appendChild(nd);f.appendChild(g);
 f.appendChild(el("div",{"class":"tlnote",style:"margin-top:6px;font-size:11.5px"},T(S.ecHint)));
 var sb=el("button",{"class":"tlbtn"},T(S.add));f.appendChild(sb);wrap.appendChild(f);
 /* a filled-in but invalid field blocks saving (it used to be dropped silently, e.g. pH "65" saved as EC-only) */
 function fv(i){var s=String(i.value==null?"":i.value).trim();return {on:s!==""||!!(i.validity&&i.validity.badInput),v:parseFloat(s.replace(",","."))};}
 sb.addEventListener("click",function(){var P=fv(iPh),E=fv(iEc),Q=fv(iTp),ph=P.v,ec=E.v,tp=Q.v;
  var okPh=P.on&&isFinite(ph)&&ph>=0&&ph<=14,okEc=E.on&&isFinite(ec)&&ec>=0&&ec<=10,okTp=Q.on&&isFinite(tp)&&tp>=-5&&tp<=60;if((!okPh&&!okEc)||(P.on&&!okPh)||(E.on&&!okEc)||(Q.on&&!okTp)){toast(T(S.invalid));return;}
  var a=logAll();a.push({t:Date.now(),c:sel.value,ph:okPh?Math.round(ph*100)/100:null,ec:okEc?Math.round(ec*100)/100:null,tp:okTp?Math.round(tp*10)/10:null,n:(iNt.value||"").slice(0,80)});if(a.length>400)a=a.slice(-400);lsSet(PHK,a);toast(okPh&&ph===0?T(S.phZero):T(S.saved));window.__goodMoment&&window.__goodMoment("phlog");track("phlog_add",{c:sel.value});renderPh();});
 var all=logAll(),mine=all.filter(function(e){return e.c===sel.value;});var c=crById(sel.value);
 var tc=el("div",{"class":"tlcard"});tc.appendChild(el("div",{"class":"tlh"},T(S.target)+": "+T(c[1])));tc.appendChild(el("div",{"class":"tlnote"},"pH "+c[4]+" – "+c[5]+"   ·   EC "+c[2]+" – "+c[3]+" mS/cm"));
 if(mine.length){var last=mine[mine.length-1],prev=mine.length>1?mine[mine.length-2]:null;var lt=el("div",{style:"font-weight:800;margin-top:10px"},T(S.latest)+" — ");lt.appendChild(el("bdi",null,new Date(last.t).toLocaleString(L(),{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})));tc.appendChild(lt);
  var row=el("div",{style:"display:flex;gap:14px;flex-wrap:wrap;margin-top:4px;font-size:15px",dir:"ltr"});if(last.ph!=null)row.appendChild(el("b",{"class":(last.ph<c[4]||last.ph>c[5])?"tlbad":"tlgood"},"pH "+last.ph));if(last.ec!=null)row.appendChild(el("b",{"class":(last.ec<c[2]||last.ec>c[3])?"tlbad":"tlgood"},"EC "+last.ec));if(last.tp!=null)row.appendChild(el("b",null,"🌡️ "+last.tp+"°"));tc.appendChild(row);
  advice(last,prev).forEach(function(a){tc.appendChild(el("div",{"class":a.b?"tlwarn":"tlok"},a.t));});
  var pts=mine.slice(-30);tc.appendChild(chart(pts,c[4],c[5],"ph",S.chartPh,"#2FA25E"));tc.appendChild(chart(pts,c[2],c[3],"ec",S.chartEc,"#3B82C4"));}
 else tc.appendChild(el("div",{"class":"tlnote",style:"margin-top:8px"},T(S.noData)));
 wrap.appendChild(tc);
 var ac=el("div",{"class":"tlcard"});var rb=el("button",{"class":"tlbtn g",style:"margin-top:0"},T(S.remind));rb.addEventListener("click",function(){if(rb.disabled)return;try{var d=new Date();for(var i=0;i<7;i++){var x=new Date(d);x.setDate(d.getDate()+i);window.__calAddTask&&window.__calAddTask(ymd(x),T(S.measTask));}rb.disabled=true;rb.style.opacity=".6";toast(T(S.reminded));track("phlog_remind",{});}catch(_){}});ac.appendChild(rb);
 if(all.length){var eb=el("button",{"class":"tlbtn g"},T(S.exportCsv));eb.addEventListener("click",function(){function hm(d){return ymd(d)+" "+(d.getHours()<10?"0":"")+d.getHours()+":"+(d.getMinutes()<10?"0":"")+d.getMinutes();}/* local time (was UTC) */var csv="date,crop,pH,EC (mS/cm),temp (C),note\n"+all.map(function(e){return hm(new Date(e.t))+","+e.c+","+(e.ph==null?"":e.ph)+","+(e.ec==null?"":e.ec)+","+(e.tp==null?"":e.tp)+",\""+String(e.n||"").replace(/"/g,"'").replace(/[\r\n]+/g," ")+"\"";}).join("\n");try{if(br()&&br().shareCsv)br().shareCsv(csv,"ph_ec_log.csv",T(S.phTitle));}catch(_){}});ac.appendChild(eb);}
 wrap.appendChild(ac);
 if(mine.length){var hc=el("div",{"class":"tlcard"});hc.appendChild(el("div",{"class":"tlh"},T(S.history)));mine.slice().reverse().slice(0,40).forEach(function(e){var r=el("div",{"class":"tlrow"});var dd=el("div");dd.appendChild(el("bdi",null,new Date(e.t).toLocaleString(L(),{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"})));if(e.n)dd.appendChild(document.createTextNode(" · "+e.n));r.appendChild(dd);var v=el("div",{style:"display:flex;gap:8px;align-items:center",dir:"ltr"});if(e.ph!=null)v.appendChild(el("b",{"class":(e.ph<c[4]||e.ph>c[5])?"tlbad":""},"pH "+e.ph));if(e.ec!=null)v.appendChild(el("b",{"class":(e.ec<c[2]||e.ec>c[3])?"tlbad":""},"EC "+e.ec));var x=el("button",{"class":"tlmini"},"✕");x.setAttribute("aria-label",T(S.del));x.addEventListener("click",function(){lsSet(PHK,logAll().filter(function(z){return z.t!==e.t;}));renderPh();});v.appendChild(x);r.appendChild(v);hc.appendChild(r);});wrap.appendChild(hc);}
}
window.__openPhLog=function(){shell();renderPh();show();track("open_phlog",{});};

/* ================= SHARE DIAGNOSIS AS IMAGE ================= */
/* word wrap for canvas; a token wider than the line (CJK sentences have no spaces, long URLs) is broken between characters,
   keeping closing punctuation (，。）…) off the start of a line. Combining marks / Devanagari vowel signs stay with their base. */
var CHR=/[\uD800-\uDBFF][\uDC00-\uDFFF](?:️|‍[\uD800-\uDBFF][\uDC00-\uDFFF])*|[^\uD800-\uDFFF][̀-ͯؐ-ًؚ-ٰٟऀ-ःऺ-ॏ॑-ॗॢॣ️‌‍]*/g;
function wrapLines(ctx,txt,maxW){var words=String(txt==null?"":txt).split(/\s+/),lines=[],cur="";function w_(t){return ctx.measureText(t).width;}
 words.forEach(function(w){if(!w)return;var t=cur?cur+" "+w:w;if(w_(t)<=maxW){cur=t;return;}if(cur&&w_(w)<=maxW){lines.push(cur);cur=w;return;}
  var c0=cur?cur+" ":"";(w.match(CHR)||[w]).forEach(function(ch){var t2=c0+ch;if(w_(t2)>maxW&&c0.replace(/\s+$/,"")&&!/^[，。、；：！？）》」』】,.;:!?)\]]/.test(ch)){lines.push(c0.replace(/\s+$/,""));c0=ch;}else c0=t2;});cur=c0;});
 if(cur)lines.push(cur);return lines;}
function clip(lines,n){if(lines.length<=n)return lines;var a=lines.slice(0,n);a[n-1]=a[n-1].replace(/[\s,.;:،，。、]+$/,"")+"…";return a;}
/* direction of a free text: majority of Arabic-script vs other letters ("" = undecided, inherit) */
function dirOf(s){s=String(s==null?"":s);var a=(s.match(/[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/g)||[]).length,l=(s.match(/[A-Za-zÀ-ɏЀ-ӿऀ-ॿ぀-ヿ㐀-鿿가-힯]/g)||[]).length;return a>l?"rtl":(l>a?"ltr":"");}
window.__shareDiag=function(o){try{var a=(o&&o.arr)||[];if(!a[0])return;var rtl=L()==="ar",W=1080;
 var FF="'Noto Sans Arabic','Noto Sans','Noto Sans CJK SC','Noto Sans Devanagari',system-ui,sans-serif";
 function paint(x,H){var draw=!!H;var X0=rtl?W-90:90,MW=W-180;
  if(draw){var g=x.createLinearGradient(0,0,W,H);g.addColorStop(0,"#0B3D2E");g.addColorStop(1,"#1F8A57");x.fillStyle=g;x.fillRect(0,0,W,H);}
  x.direction=rtl?"rtl":"ltr";x.textAlign=rtl?"right":"left";
  /* per-line direction: a Latin line inside the Arabic card keeps its own word/punctuation order (alignment stays right) */
  function tx(t,px,py){if(!draw)return;try{x.direction=dirOf(t)||(rtl?"rtl":"ltr");}catch(_){}x.fillText(t,px,py);}
  x.fillStyle="#fff";x.font="800 40px "+FF;tx("🌱 Hydroponic Smart Assistant",X0,110);x.font="600 30px "+FF;x.fillStyle="rgba(255,255,255,.85)";tx("🩺 "+T(S.aiDx),X0,160);
  if(draw){var cy=200,ch=H-200-150,r=36;x.beginPath();x.moveTo(50+r,cy);x.arcTo(W-50,cy,W-50,cy+ch,r);x.arcTo(W-50,cy+ch,50,cy+ch,r);x.arcTo(50,cy+ch,50,cy,r);x.arcTo(50,cy,W-50,cy,r);x.closePath();x.fillStyle="#fff";x.fill();}
  var y=290;
  if(o.crop){x.font="700 36px "+FF;x.fillStyle="#2FA25E";tx("🌿 "+o.crop,X0,y);y+=64;}
  x.fillStyle="#132520";x.font="900 50px "+FF;clip(wrapLines(x,a[0].name,MW),3).forEach(function(l){tx(l,X0,y);y+=62;});
  x.font="700 32px "+FF;x.fillStyle="#1F6B3D";var cf=parseFloat(a[0].conf);tx((isFinite(cf)?T(S.conf)+": "+Math.round(cf)+"%":"")+(o.severity?(isFinite(cf)?"   ·   ":"")+T(S.sev)+": "+o.severity:""),X0,y+6);y+=70;
  if(draw){x.fillStyle="#E3ECE3";x.fillRect(90,y-30,W-180,3);}
  [[S.todayDo,o.today,"⏱️"],[S.organic,o.organic,"🌿"],[S.chem,o.chemical,"💊"]].forEach(function(s){if(!s[1])return;x.font="800 32px "+FF;x.fillStyle="#132520";tx(s[2]+" "+T(s[0]),X0,y+10);y+=54;x.font="500 28px "+FF;x.fillStyle="#3b4d45";clip(wrapLines(x,s[1],MW),5).forEach(function(l){tx(l,X0,y);y+=40;});y+=24;});
  var HH=Math.max(1000,y+40+150);
  if(draw){x.textAlign="center";x.fillStyle="#fff";x.font="800 34px "+FF;tx("▶ "+T(S.getApp),W/2,H-80);x.direction="ltr";x.font="500 24px "+FF;x.fillStyle="rgba(255,255,255,.8)";tx("play.google.com/store/apps/details?id=com.hydro.calc",W/2,H-38);}
  return HH;}
 var m=document.createElement("canvas").getContext("2d");var H=Math.min(1920,paint(m,0));var cv=document.createElement("canvas");cv.width=W;cv.height=H;paint(cv.getContext("2d"),H);
 var tpl=T(S.shareTxt),cf0=parseFloat(a[0].conf);if(!o.crop)tpl=tpl.replace("{c} — ","");if(!isFinite(cf0))tpl=tpl.replace(/\s?[（(]\{p\}\s?%[）)]/,"");
 var txt=tpl.replace("{c}",String(o.crop||"")).replace("{x}",String(a[0].name||"")).replace("{p}",String(Math.round(cf0)))+"\n"+pl("diagnosis");var b64=cv.toDataURL("image/png").split(",")[1];
 track("share_diag",{d:a[0].name});
 if(br()&&br().shareImage)br().shareImage(b64,txt);else if(br()&&br().shareText)br().shareText(txt);else if(navigator.share)navigator.share({text:txt}).catch(function(){});
}catch(e){try{br()&&br().shareText&&br().shareText(pl("diagnosis"));}catch(_){}}};


/* ================= PLANT IDENTIFICATION (photo -> name) ================= */
var IS={
 title:M("🔍 تعرّف على النبتة","🔍 Identify a plant","🔍 Identifier une plante","🔍 Identificar una planta","🔍 识别植物","🔍 पौधे की पहचान","🔍 Identificar planta","🔍 Plant herkennen"),
 sub:M("صوّر أي نبتة أو ورقة أو زهرة أو ثمرة، ونخبرك باسمها العلمي والشائع وطريقة زراعتها","Photograph any plant, leaf, flower or fruit and get its common & scientific name and how to grow it","Photographiez une plante, feuille, fleur ou fruit : nom commun, nom scientifique et culture","Fotografía cualquier planta, hoja, flor o fruto y obtén su nombre común, científico y cómo cultivarla","拍摄任意植物、叶、花或果实，获取其俗名、学名和种植方法","किसी भी पौधे, पत्ती, फूल या फल की फोटो लें — आम व वैज्ञानिक नाम और उगाने का तरीका जानें","Fotografe qualquer planta, folha, flor ou fruto e saiba o nome comum, científico e como cultivar","Fotografeer een plant, blad, bloem of vrucht en krijg de gewone en wetenschappelijke naam en teeltinfo"),
 pick:M("📷 التقط أو اختر صورة النبتة","📷 Take or choose a plant photo","📷 Prendre ou choisir une photo","📷 Toma o elige una foto","📷 拍摄或选择植物照片","📷 पौधे की फोटो लें या चुनें","📷 Tire ou escolha uma foto","📷 Maak of kies een foto"),
 tip:M("للحصول على أدق نتيجة: صوّر النبتة كاملة أو ورقة/زهرة واضحة بإضاءة جيدة.","For the best result: photograph the whole plant or a clear leaf/flower in good light.","Pour un meilleur résultat : la plante entière ou une feuille/fleur nette, bien éclairée.","Para mejor resultado: la planta entera o una hoja/flor nítida con buena luz.","最佳效果：在光线充足处拍摄整株或清晰的叶/花。","सबसे अच्छे परिणाम के लिए: पूरा पौधा या साफ़ पत्ती/फूल अच्छी रोशनी में।","Melhor resultado: planta inteira ou folha/flor nítida com boa luz.","Beste resultaat: hele plant of scherp blad/bloem bij goed licht."),
 wait:M("⏳ جارٍ التعرف على النبتة…","⏳ Identifying the plant…","⏳ Identification en cours…","⏳ Identificando la planta…","⏳ 正在识别…","⏳ पहचान हो रही है…","⏳ Identificando a planta…","⏳ Plant wordt herkend…"),
 offline:M("لا يوجد اتصال بالإنترنت — التعرف يحتاج اتصالاً","No internet connection — identification needs to be online","Pas de connexion — l'identification nécessite Internet","Sin conexión — la identificación requiere internet","无网络 — 识别需要联网","इंटरनेट नहीं — पहचान के लिए इंटरनेट चाहिए","Sem conexão — a identificação precisa de internet","Geen verbinding — herkenning vereist internet"),
 fail:M("تعذّر التعرف، حاول بصورة أوضح","Couldn't identify — try a clearer photo","Échec — essayez une photo plus nette","No se pudo — prueba con una foto más clara","识别失败 — 请换一张更清晰的照片","पहचान नहीं हो सकी — साफ़ फोटो आज़माएँ","Não foi possível — tente uma foto mais nítida","Mislukt — probeer een scherpere foto"),
 img:M("تعذّرت قراءة الصورة — جرّب صورة أخرى","Couldn't read this photo — try another one","Impossible de lire cette photo — essayez-en une autre","No se pudo leer la foto — prueba con otra","无法读取这张照片 — 请换一张试试","यह फोटो पढ़ी नहीं जा सकी — दूसरी फोटो आज़माएँ","Não foi possível ler a foto — tente outra","Kan deze foto niet lezen — probeer een andere"),
 busy:M("الخدمة مشغولة حالياً — أعد المحاولة بعد دقيقة","The service is busy right now — try again in a minute","Le service est saturé pour le moment — réessayez dans une minute","El servicio está ocupado ahora — inténtalo de nuevo en un minuto","服务繁忙 — 请一分钟后重试","सेवा अभी व्यस्त है — एक मिनट बाद फिर कोशिश करें","O serviço está ocupado agora — tente de novo em um minuto","De dienst is nu druk — probeer het over een minuut opnieuw"),
 net:M("مشكلة في الاتصال — تحقّق من الإنترنت وأعد المحاولة","Connection problem — check your internet and try again","Problème de connexion — vérifiez Internet et réessayez","Problema de conexión — revisa internet e inténtalo de nuevo","网络连接问题 — 请检查网络后重试","कनेक्शन में समस्या — इंटरनेट जाँचकर फिर कोशिश करें","Problema de conexão — verifique a internet e tente novamente","Verbindingsprobleem — controleer je internet en probeer opnieuw"),
 gen:M("حدث خطأ أثناء التعرّف — أعد المحاولة","Something went wrong during identification — please try again","Une erreur s'est produite pendant l'identification — réessayez","Algo salió mal durante la identificación — inténtalo de nuevo","识别过程中出错 — 请重试","पहचान के दौरान कुछ गड़बड़ हुई — फिर से कोशिश करें","Algo deu errado na identificação — tente novamente","Er ging iets mis bij het herkennen — probeer het opnieuw"),
 retry:M("🔄 أعد المحاولة","🔄 Try again","🔄 Réessayer","🔄 Reintentar","🔄 重试","🔄 फिर कोशिश करें","🔄 Tentar novamente","🔄 Opnieuw proberen"),
 yes:M("نعم","Yes","Oui","Sí","是","हाँ","Sim","Ja"),
 no:M("لا","No","Non","No","否","नहीं","Não","Nee"),
 notPlant:M("🚫 لا يبدو أن الصورة لنبتة","🚫 This doesn't look like a plant","🚫 Ce n'est pas une plante","🚫 No parece una planta","🚫 这似乎不是植物","🚫 यह पौधा नहीं लगता","🚫 Não parece uma planta","🚫 Dit lijkt geen plant"),
 conf:M("الثقة","Confidence","Confiance","Confianza","置信度","विश्वास","Confiança","Zekerheid"),
 sci:M("الاسم العلمي","Scientific name","Nom scientifique","Nombre científico","学名","वैज्ञानिक नाम","Nome científico","Wetenschappelijke naam"),
 fam:M("العائلة","Family","Famille","Familia","科","कुल","Família","Familie"),
 other:M("أسماء أخرى","Other names","Autres noms","Otros nombres","其他名称","अन्य नाम","Outros nomes","Andere namen"),
 cat:M("النوع","Type","Type","Tipo","类别","प्रकार","Tipo","Type"),
 edible:M("🍽️ قابلية الأكل","🍽️ Edible","🍽️ Comestible","🍽️ Comestible","🍽️ 可食用","🍽️ खाने योग्य","🍽️ Comestível","🍽️ Eetbaar"),
 toxic:M("☠️ السُّمية","☠️ Toxicity","☠️ Toxicité","☠️ Toxicidad","☠️ 毒性","☠️ विषाक्तता","☠️ Toxicidade","☠️ Giftigheid"),
 light:M("☀️ الإضاءة","☀️ Light","☀️ Lumière","☀️ Luz","☀️ 光照","☀️ रोशनी","☀️ Luz","☀️ Licht"),
 water:M("💧 الري","💧 Water","💧 Arrosage","💧 Riego","💧 浇水","💧 पानी","💧 Rega","💧 Water"),
 soil:M("🪴 التربة","🪴 Soil","🪴 Sol","🪴 Suelo","🪴 土壤","🪴 मिट्टी","🪴 Solo","🪴 Grond"),
 temp:M("🌡️ الحرارة","🌡️ Temperature","🌡️ Température","🌡️ Temperatura","🌡️ 温度","🌡️ तापमान","🌡️ Temperatura","🌡️ Temperatuur"),
 hydro:M("💦 الزراعة المائية","💦 Hydroponics","💦 Hydroponie","💦 Hidroponía","💦 水培","💦 हाइड्रोपोनिक्स","💦 Hidroponia","💦 Hydrocultuur"),
 season:M("📆 الموسم","📆 Season","📆 Saison","📆 Temporada","📆 季节","📆 मौसम","📆 Época","📆 Seizoen"),
 tips:M("💡 نصائح","💡 Tips","💡 Conseils","💡 Consejos","💡 建议","💡 सुझाव","💡 Dicas","💡 Tips"),
 alts:M("احتمالات أخرى","Other possibilities","Autres possibilités","Otras posibilidades","其他可能","अन्य संभावनाएँ","Outras possibilidades","Andere mogelijkheden"),
 goCare:M("🌱 العناية بهذه النبتة","🌱 Care guide for this plant","🌱 Fiche de soins","🌱 Guía de cuidados","🌱 养护指南","🌱 इस पौधे की देखभाल","🌱 Guia de cuidados","🌱 Verzorgingsgids"),
 goSeason:M("📆 موسم زراعتها في منطقتي","📆 Planting season in my region","📆 Saison de plantation chez moi","📆 Temporada de siembra en mi región","📆 我所在地区的种植季节","📆 मेरे क्षेत्र में बुवाई मौसम","📆 Época de plantio na minha região","📆 Plantseizoen in mijn regio"),
 goDoc:M("🩺 هل هي مريضة؟ افحصها","🩺 Is it sick? Diagnose it","🩺 Malade ? Diagnostiquez","🩺 ¿Está enferma? Diagnostícala","🩺 生病了？进行诊断","🩺 बीमार है? जाँचें","🩺 Está doente? Diagnostique","🩺 Ziek? Diagnoseer"),
 again:M("🔄 تعرّف على نبتة أخرى","🔄 Identify another plant","🔄 Identifier une autre plante","🔄 Identificar otra planta","🔄 识别另一株植物","🔄 दूसरा पौधा पहचानें","🔄 Identificar outra planta","🔄 Nog een plant herkennen"),
 disc:M("النتيجة تقدير بالذكاء الاصطناعي — لا تأكل أي نبتة برية اعتماداً عليها وحدها.","AI estimate — never eat a wild plant based on this alone.","Estimation IA — ne mangez jamais une plante sauvage sur cette seule base.","Estimación IA — nunca comas una planta silvestre basándote solo en esto.","AI 估计结果 — 切勿仅凭此食用野生植物。","AI अनुमान — केवल इसके आधार पर कोई जंगली पौधा न खाएँ।","Estimativa por IA — nunca coma uma planta silvestre só com base nisto.","AI-schatting — eet nooit een wilde plant alleen op basis hiervan."),
 shareTxt:M("🔍 تعرّفت على هذه النبتة عبر Hydroponic Smart Assistant: {n} ({s})","🔍 I identified this plant with Hydroponic Smart Assistant: {n} ({s})","🔍 Plante identifiée avec Hydroponic Smart Assistant : {n} ({s})","🔍 Identifiqué esta planta con Hydroponic Smart Assistant: {n} ({s})","🔍 我用 Hydroponic Smart Assistant 识别了这株植物：{n}（{s}）","🔍 Hydroponic Smart Assistant से पहचाना: {n} ({s})","🔍 Identifiquei esta planta com o Hydroponic Smart Assistant: {n} ({s})","🔍 Deze plant herkend met Hydroponic Smart Assistant: {n} ({s})")
};
var idStatus=null,idPrev=null,idRes=null,idCur=false,idRetry=null,idTimer=null;
/* crop ids that Plant Care / Seasons know (same list as the native prompt); aliases for common Gemini variations */
var IDCROPS="tomato,pepper,chili,eggplant,cucumber,zucchini,watermelon,lettuce,cabbage,spinach,basil,mint,parsley,thyme,rosemary,onion,garlic,carrot,potato,sweetpotato,beans,okra,strawberry,olive,citrus,grape,fig,pomegranate,datepalm,mango,banana,guava,papaya,avocado,apple,broccoli,cauliflower,peas,sweetcorn,radish,beet,celery,leek,pumpkin,artichoke,pakchoi,molokhia,chard,coriander,dill,sage,oregano,lemongrass,kale,arugula,peach,apricot,cherry,almond,walnut,dragonfruit,pineapple,kiwi,blueberry,raspberry,annona,mulberry,wheat,barley,maize,rice,peanut,cotton,sunflower,alfalfa,chickpea,lentil".split(",");
var IDALIAS={sweetpepper:"pepper",bellpepper:"pepper",chilli:"chili",chilipepper:"chili",hotpepper:"chili",aubergine:"eggplant",brinjal:"eggplant",courgette:"zucchini",bokchoy:"pakchoi",bokchoi:"pakchoi",pakchoy:"pakchoi",rocket:"arugula",rucola:"arugula",cilantro:"coriander",swisschard:"chard",beetroot:"beet",bean:"beans",greenbeans:"beans",pea:"peas",date:"datepalm",dates:"datepalm",lemon:"citrus",orange:"citrus",lime:"citrus",mandarin:"citrus",tomatoes:"tomato",potatoes:"potato",sweetpotatoes:"sweetpotato",cucumbers:"cucumber",strawberries:"strawberry",blueberries:"blueberry",raspberries:"raspberry"};
function cropId(v){var s=String(v==null?"":v).toLowerCase().replace(/[\s_\-]+/g,"");if(IDALIAS[s])s=IDALIAS[s];if(!s)return "";
 try{var cd=window.__careData&&window.__careData.CROPS;if(cd&&cd.length){for(var i=0;i<cd.length;i++)if(cd[i]&&cd[i].id===s)return s;return "";}}catch(_){}
 return IDCROPS.indexOf(s)>=0?s:"";}
/* any JSON value from the model -> display text (arrays joined, booleans localized, "null"/"n/a" dropped) */
function tv(v){if(v==null)return "";if(typeof v==="boolean")return T(v?IS.yes:IS.no);if(typeof v==="number")return isFinite(v)?String(v):"";
 if(Array.isArray(v))return v.map(tv).filter(function(x){return x;}).join(L()==="ar"?"، ":L()==="zh"?"、":", ");
 if(typeof v==="object"){var a=[];for(var k in v)if(Object.prototype.hasOwnProperty.call(v,k)){var s0=tv(v[k]);if(s0)a.push(s0);}return a.join(" · ");}
 var s=String(v).trim();return /^(null|undefined|n\/a|-|—|–)$/i.test(s)?"":s;}
/* 85, "85%", "85 %" or 0.85 -> 85 ; missing / garbage -> null */
function pct(v){if(v==null||v==="")return null;var s=String(v),n=parseFloat(s.replace(",","."));if(!isFinite(n))return null;if(n>0&&n<1&&s.indexOf(".")>=0&&s.indexOf("%")<0)n*=100;return Math.max(0,Math.min(100,Math.round(n)));}
/* text element whose direction follows its content when it differs from the UI (e.g. English text in the Arabic UI) */
function tEl(tag,attrs,text,inline){var e=el(tag,attrs),d=dirOf(text),pd=L()==="ar"?"rtl":"ltr";if(inline){var b=document.createElement("bdi");if(d)b.setAttribute("dir",d);b.textContent=text;e.appendChild(b);}else{e.textContent=text;if(d&&d!==pd)e.setAttribute("dir",d);}return e;}
/* native error codes ("offline","img","busy","net","parse","err:<detail>") and legacy raw strings -> short code; raw bodies are never shown */
function idCode(m){var l=String(m==null?"":m).trim().toLowerCase();if(/^(offline|img|busy|net|parse)$/.test(l))return l;
 if(l.indexOf("err:")===0)l=l.slice(4).trim();l=l.replace(/^gemini:\s*/,"");
 if(/offline|no internet|not connected|لا يوجد اتصال|لا يوجد إنترنت/.test(l))return "offline";
 if(/^img|read image/.test(l))return "img";
 if(/http 429|http 5\d\d|resource_exhausted|overload|unavailable|quota|rate.?limit|too many requests|busy/.test(l))return "busy";
 if(/timeout|timed out|http 408|unknownhost|unable to resolve|failed to connect|connect|socket|ssl|handshake|network|eof|reset|abort/.test(l))return "net";
 if(/image|photo|mime/.test(l))return "img";
 if(/parse|json|empty|candidate/.test(l))return "parse";
 return "gen";}
function idMsg(c){if(String(c||"")==="region"||String(c||"").indexOf("451")>=0){try{window.__aiRegionCheck&&window.__aiRegionCheck();}catch(_){}if(window.__aiRegionFull)return window.__aiRegionFull();}return T(c==="offline"?IS.offline:c==="img"?IS.img:c==="busy"?IS.busy:c==="net"?IS.net:c==="parse"?IS.fail:IS.gen);}
function idState(msg,err){if(!idStatus)return;idStatus.className=err?"tlwarn":"tlnote";idStatus.textContent=msg||"";if(idRetry)idRetry.style.display=err?"block":"none";}
function idFail(code){clearTimeout(idTimer);if(idCur)idState("⚠️ "+idMsg(code),true);}
function renderId(){shell();header(IS.title,IS.sub);idCur=true;clearTimeout(idTimer);
 var c=el("div",{"class":"tlcard"});var inp=el("input",{type:"file",accept:"image/*",id:"tlidfile",style:"display:none"});var lb=el("label",{"for":"tlidfile","class":"tlbtn",style:"display:block;text-align:center;margin-top:0;font-size:16px;padding:16px"},T(IS.pick));
 /* clear the value so picking the same photo again still fires "change" */
 inp.addEventListener("click",function(){try{inp.value="";}catch(_){}try{br()&&br().setScanMode&&br().setScanMode("id");}catch(_){}});
 c.appendChild(lb);c.appendChild(inp);c.appendChild(el("div",{"class":"tlnote",style:"margin-top:8px"},T(IS.tip)));
 idPrev=el("img",{alt:"",style:"display:none;width:100%;max-height:260px;object-fit:cover;border-radius:12px;margin-top:10px"});c.appendChild(idPrev);
 idStatus=el("div",{"class":"tlnote",style:"margin-top:8px;font-weight:800;font-size:14px"});c.appendChild(idStatus);
 idRetry=el("button",{"class":"tlbtn g",style:"display:none"},T(IS.retry));idRetry.addEventListener("click",function(){try{inp.click();}catch(_){}});c.appendChild(idRetry);
 inp.addEventListener("change",function(){var f=inp.files&&inp.files[0];if(!f)return;try{var rd=new FileReader();rd.onload=function(){idPrev.src=rd.result;idPrev.style.display="block";};rd.readAsDataURL(f);}catch(_){}var on=("onLine"in navigator)?navigator.onLine:true;if(idRes)idRes.innerHTML="";
  /* watchdog: native gives up after ~2 min at most (2 models x 15 s connect + 40 s read); never leave the user on "Identifying…" forever */
  if(on){idState(T(IS.wait),false);clearTimeout(idTimer);idTimer=setTimeout(function(){idFail("net");},125000);}else idFail("offline");track("plant_id_start",{});});
 wrap.appendChild(c);idRes=el("div");wrap.appendChild(idRes);wrap.appendChild(el("div",{"class":"tlnote",style:"text-align:center;margin-top:8px"},T(IS.disc)));}
window.__openPlantId=function(){renderId();show();track("open_plantid",{});};
window.__showPlantId=function(o){renderId();show();window.__idResult(o,true);};
window.__idErr=function(m){try{var code=idCode(m);idFail(code);track("plant_id_err",{c:code,m:String(m==null?"":m).slice(0,60)});}catch(_){}};
var TOXN=/(غير|ليس|ليست|لا تعتبر|لا يعتبر)\s+(سام|سامة|سامّة)|لا\s+(توجد|يوجد)\s+(سمية|سُمية)(\s+معروفة)?|non[-\s]?toxic|not\s+(known\s+to\s+be\s+)?(toxic|poisonous)|non[-\s]?poisonous|no\s+(known\s+)?toxicity|none\s+known|no\s+(es\s+)?t[oó]xic[oa]s?|n[aã]o\s+(é\s+)?t[oó]xic[oa]s?|sin\s+toxicidad|nenhuma\s+toxicidade|(non|pas)\s+toxique|aucune\s+toxicit[ée]|无毒|没有毒|无已知毒性|不含毒|(विषैला|विषैली|विषैले|विषाक्त|ज़हरीला|जहरीला|ज़हरीली|जहरीली)\s+नहीं|niet\s+giftig|geen\s+(bekende\s+)?giftig\w*/gi;
var TOXY=/سام|سمية|سُمية|سموم|toxic|poison|irritant|t[oó]xic|toxique|v[ée]n[ée]neu|venen|giftig|有毒|毒性|剧毒|विषाक्त|विषैल|ज़हर|जहर/i;
window.__idResult=function(o,cached){try{if(typeof o==="string"){try{o=JSON.parse(o);}catch(_){return;}}if(!o||typeof o!=="object")return;
 var notPlant=(o.is_plant===false||o.is_plant==="false"||o.is_plant===0),name=tv(o.name),sci=tv(o.sci),conf=pct(o.confidence),cid=cropId(o.crop_id);
 if(!cached){clearTimeout(idTimer);if(!notPlant){try{window.__logScan&&window.__logScan("🔍 "+(name||sci||"Plant"),conf||0,"id",Date.now(),"id",{kind:"id",o:o});}catch(_){}try{window.__maybeReview&&window.__maybeReview(conf);}catch(_){}}}
 if(!idCur||!ov||!ov.classList.contains("on")||!idRes)return;idState("",false);idRes.innerHTML="";
 if(notPlant){var n=el("div",{"class":"tlcard"});n.appendChild(el("div",{"class":"tlh"},T(IS.notPlant)));var nd=tv(o.description);if(nd)n.appendChild(tEl("div",{"class":"tlnote"},nd));idRes.appendChild(n);if(idRetry)idRetry.style.display="block";return;}
 var c=el("div",{"class":"tlcard"});c.appendChild(tEl("div",{style:"font-weight:900;font-size:22px;line-height:1.3"},"🌿 "+(name||sci||"—"),1));
 if(sci&&name&&sci!==name)c.appendChild(tEl("div",{style:"font-style:italic;font-size:15px;margin-top:2px;color:#2F7A4C"},sci,1));
 if(conf!=null){var bar=el("div",{style:"margin-top:8px;height:8px;border-radius:6px;background:#E3ECE3;overflow:hidden"});bar.appendChild(el("div",{style:"height:100%;width:"+conf+"%;background:"+(conf>=75?"#2FA25E":conf>=50?"#E0A800":"#D14343")}));c.appendChild(el("div",{"class":"tlnote",style:"margin-top:6px;font-weight:800"},T(IS.conf)+": "+conf+"%"));c.appendChild(bar);}
 function kv(l,v){v=tv(v);if(!v)return;var r=el("div",{"class":"tlrow"});r.appendChild(el("div",{style:"font-weight:800"},T(l)));r.appendChild(tEl("div",{style:"text-align:end;flex:1"},v,1));c.appendChild(r);}
 var tb=el("div",{style:"margin-top:8px"});c.appendChild(tb);kv(IS.fam,o.family);kv(IS.cat,o.category);kv(IS.other,o.other_names);
 var ds=tv(o.description);if(ds)c.appendChild(tEl("div",{style:"margin-top:10px;font-size:14px;line-height:1.7"},ds));idRes.appendChild(c);
 var g=el("div",{"class":"tlcard"});function sec(l,v,warn){v=tv(v);if(!v)return;var d=el("div",{style:"padding:8px 0;border-bottom:1px dashed #E3ECE3"});d.appendChild(el("div",{style:"font-weight:800;margin-bottom:2px"},T(l)));d.appendChild(tEl("div",{style:"font-size:13.5px;line-height:1.6"+(warn?";color:#B23B3B;font-weight:700":"")},v));g.appendChild(d);}
 /* toxicity is highlighted when a toxic word remains after removing negations ("non-toxic to people but toxic to cats" -> highlighted) */
 sec(IS.edible,o.edible);var tx=tv(o.toxicity);sec(IS.toxic,tx,o.toxicity===true||TOXY.test(tx.replace(TOXN," ")));
 sec(IS.light,o.light);sec(IS.water,o.water);sec(IS.soil,o.soil);sec(IS.temp,o.temp);sec(IS.hydro,o.hydroponic);sec(IS.season,o.season);sec(IS.tips,o.tips);
 if(g.childNodes.length)idRes.appendChild(g);
 var alts=(Array.isArray(o.alts)?o.alts:[]).map(function(x){return (typeof x==="string")?{name:x}:x;}).filter(function(x){return x&&typeof x==="object"&&(tv(x.name)||tv(x.sci));});
 if(alts.length){var a=el("div",{"class":"tlcard"});a.appendChild(el("div",{"class":"tlh"},T(IS.alts)));alts.slice(0,3).forEach(function(x){var an=tv(x.name),as=tv(x.sci),r=el("div",{"class":"tlrow"});r.appendChild(tEl("div",null,(an||as)+(an&&as&&as!==an?" — "+as:""),1));var ac=pct(x.conf);if(ac!=null)r.appendChild(el("b",null,ac+"%"));a.appendChild(r);});idRes.appendChild(a);}
 var act=el("div",{"class":"tlcard"});
 function btn(l,fn,g2){var b=el("button",{"class":"tlbtn"+(g2?" g":""),style:"margin-top:8px"},T(l));b.addEventListener("click",fn);act.appendChild(b);}
 /* Care / Season only for crops those guides really have (an unknown id used to open the tomato guide) */
 if(cid){btn(IS.goCare,function(){ov.classList.remove("on");try{window.__openCare&&window.__openCare(null,cid);}catch(_){}});btn(IS.goSeason,function(){ov.classList.remove("on");try{window.__openSeason&&window.__openSeason(cid);}catch(_){}},1);}
 btn(IS.goDoc,function(){ov.classList.remove("on");try{window.__dzOpen&&window.__dzOpen();}catch(_){}},1);
 btn(S.share,function(){var tp=T(IS.shareTxt);if(!sci||sci===name)tp=tp.replace(/\s?[（(]\{s\}[）)]/,"");var t=tp.replace("{n}",name||sci).replace("{s}",sci)+"\n"+pl("plant_id");try{if(br()&&br().shareText)br().shareText(t);else if(navigator.share)navigator.share({text:t}).catch(function(){});}catch(_){}track("plant_id_share",{});},1);
 btn(IS.again,function(){renderId();try{ov.scrollTop=0;}catch(_){}},1);
 idRes.appendChild(act);if(!cached)track("plant_id_ok",{sci:sci.slice(0,60),c:cid});
}catch(e){}};
/* ================= RE-CHECK FOLLOW-UP ================= */
window.__followUp=function(o){try{var a=(o&&o.arr)||[];var d=new Date();d.setDate(d.getDate()+7);var ds=ymd(d);window.__calAddTask&&window.__calAddTask(ds,T(S.fuTask).replace("{c}",o.crop||"🌱").replace("{x}",a[0]?a[0].name:""));toast(T(S.fuAdded).replace("{d}",d.toLocaleDateString(L(),{day:"numeric",month:"short"})));track("followup_set",{});}catch(_){}};

/* ================= IN-APP REVIEW (after the 3rd confident result, never in the session that counted the first one, max once / 60 days) =================
   __maybeReview(conf): conf = confidence of the result just shown (plant ID); called without arguments after a cloud diagnosis -> read window.__cloud.
   Low-confidence answers (< 60 %) are not "positive moments" and are not counted. */
var rvFirst=false;
window.__maybeReview=function(conf,kind){try{
 if(!arguments.length){var cl=window.__cloud&&window.__cloud.o,a0=cl&&cl.arr&&cl.arr[0];conf=a0?a0.conf:null;}
 if(!kind)kind="diag";
 conf=(conf==null||conf==="")?null:parseFloat(conf);if(conf!=null&&isFinite(conf)&&conf<60)return;
 var n0=ls("hydro_rv_n",null),n=((+n0>0)?+n0:0)+1;lsSet("hydro_rv_n",n);if(!(+n0>0))rvFirst=true;
 var last=+ls("hydro_rv_t",0)||0,g=ls("hydro_grow",null),days=(g&&+g.n)||0;
 /* v10.8: whoever tapped «Rate» (window.__rateApp sets hydro_grow.rv) is never asked again; at most 3 automatic prompts */
 if(g&&+g.rv>0)return;if((+ls("hydro_rv_c",0)||0)>=3)return;
 /* v8.8: non-AI moments count too (window.__goodMoment); needs 2+ days of use; 45-day gap; never while typing or in the background */
 if(!rvFirst&&n>=3&&days>=2&&Date.now()-last>45*864e5&&br()&&br().requestReview){lsSet("hydro_rv_t",Date.now());lsSet("hydro_rv_c",(+ls("hydro_rv_c",0)||0)+1);
  var tries=0,fire=function(){try{var ae=document.activeElement,busy=ae&&/^(INPUT|TEXTAREA|SELECT)$/.test(ae.tagName);
   if((busy||document.hidden)&&++tries<4){setTimeout(fire,4000);return;}if(document.hidden)return;
   br().requestReview();track("review_prompt",{n:n,k:String(kind).slice(0,20)});}catch(_){}};
  setTimeout(fire,3000);}}catch(_){}};
/* ================= DISEASE RISK FROM WEATHER (v8.0) =================
   Simplified infection-risk rules on the daily forecast (mean temp, mean/max RH, rain). Levels: 0 low, 1 medium, 2 high. */
var RK={
 title:M("🦠 إنذار الأمراض من الطقس","🦠 Weather disease-risk alert","🦠 Alerte maladies (météo)","🦠 Alerta de enfermedades (clima)","🦠 天气病害风险预警","🦠 मौसम से रोग-जोखिम चेतावनी","🦠 Alerta de doenças (clima)","🦠 Ziekterisico door weer"),
 sub:M("تقدير للأيام الثلاثة القادمة حسب الحرارة والرطوبة والمطر في مدينتك.","Estimate for the next 3 days from temperature, humidity and rain in your city.","Estimation sur 3 jours selon température, humidité et pluie.","Estimación de 3 días según temperatura, humedad y lluvia.","根据你所在城市未来 3 天的温度、湿度和降雨估算。","आपके शहर के तापमान, आर्द्रता व वर्षा से अगले 3 दिन का अनुमान।","Estimativa de 3 dias por temperatura, umidade e chuva.","Schatting voor 3 dagen op basis van temperatuur, vocht en regen."),
 high:M("مرتفع","High","Élevé","Alto","高","उच्च","Alto","Hoog"),
 med:M("متوسط","Medium","Moyen","Medio","中","मध्यम","Médio","Middel"),
 none:M("✅ لا خطر مرتفع متوقع — استمر بالوقاية المعتادة.","✅ No high risk expected — keep routine prevention.","✅ Pas de risque élevé prévu — prévention habituelle.","✅ Sin riesgo alto previsto — prevención habitual.","✅ 预计无高风险 — 保持常规预防。","✅ कोई उच्च जोखिम नहीं — सामान्य बचाव जारी रखें।","✅ Sem risco alto previsto — prevenção habitual.","✅ Geen hoog risico verwacht — gewone preventie."),
 days:M("أيام الخطر: {d}","Risk days: {d}","Jours à risque : {d}","Días de riesgo: {d}","风险日：{d}","जोखिम दिन: {d}","Dias de risco: {d}","Risicodagen: {d}"),
 more:M("التفاصيل والعلاج ›","Details & treatment ›","Détails & traitement ›","Detalles y tratamiento ›","详情与防治 ›","विवरण व उपचार ›","Detalhes e tratamento ›","Details & behandeling ›"),
 noRh:M("حدّث الطقس لإضافة الرطوبة إلى التقدير.","Refresh the weather to include humidity in the estimate.","Actualisez la météo pour inclure l'humidité.","Actualiza el clima para incluir la humedad.","刷新天气以纳入湿度。","आर्द्रता जोड़ने हेतु मौसम ताज़ा करें।","Atualize o clima para incluir a umidade.","Ververs het weer om vocht mee te nemen."),
 note:M("نموذج تقديري مبسّط، لا يغني عن الفحص الميداني.","Simplified estimate — not a substitute for scouting.","Estimation simplifiée — ne remplace pas l'observation.","Estimación simplificada — no sustituye la inspección.","简化估算 — 不能代替田间检查。","सरल अनुमान — खेत जाँच का विकल्प नहीं।","Estimativa simplificada — não substitui a inspeção.","Vereenvoudigde schatting — geen vervanging voor controle."),
 home:M("🦠 خطر أمراض مرتفع: {n}","🦠 High disease risk: {n}","🦠 Risque élevé : {n}","🦠 Riesgo alto: {n}","🦠 病害高风险：{n}","🦠 रोग का उच्च जोखिम: {n}","🦠 Risco alto: {n}","🦠 Hoog ziekterisico: {n}")
};
var RD=[
 {k:"lb",lib:"lateblight",n:M("اللفحة المتأخرة / البياض الزغبي","Late blight / downy mildew","Mildiou","Tizón tardío / mildiu","晚疫病 / 霜霉病","पछेती झुलसा / डाउनी मिल्ड्यू","Requeima / míldio","Phytophthora / valse meeldauw"),
  a:M("رش وقائي نحاسي أو مبيد FRAC 40/43 قبل الرطوبة، وتهوية، وري صباحي فقط.","Preventive copper or FRAC 40/43 before the wet spell; ventilate; water mornings only.","Cuivre ou FRAC 40/43 en préventif avant l'humidité ; aérez.","Cobre o FRAC 40/43 preventivo antes de la humedad; ventila.","潮湿前预防喷铜制剂或 FRAC 40/43；通风；只在早上浇水。","नमी से पहले तांबा या FRAC 40/43 निवारक; हवा दें; सुबह ही पानी।","Cobre ou FRAC 40/43 preventivo antes da umidade; ventile.","Preventief koper of FRAC 40/43 vóór de natte periode; ventileer.")},
 {k:"bo",lib:"botrytis",n:M("العفن الرمادي (بوتريتس)","Grey mould (Botrytis)","Pourriture grise (Botrytis)","Moho gris (Botrytis)","灰霉病","ग्रे मोल्ड (बोट्राइटिस)","Mofo-cinzento (Botrytis)","Grauwe schimmel (Botrytis)"),
  a:M("أزل الأزهار والأوراق الميتة، وخفّض الرطوبة تحت 85%، وBacillus وقائياً.","Remove dead flowers/leaves, keep RH below 85%, preventive Bacillus.","Retirez fleurs/feuilles mortes, HR < 85 %, Bacillus en préventif.","Quita flores/hojas muertas, HR < 85 %, Bacillus preventivo.","清除残花枯叶，湿度保持 85% 以下，预防用芽孢杆菌。","मृत फूल/पत्ते हटाएँ, आर्द्रता 85% से कम, Bacillus निवारक।","Retire flores/folhas mortas, UR < 85%, Bacillus preventivo.","Verwijder dode bloemen/bladeren, RV < 85%, preventief Bacillus.")},
 {k:"eb",lib:"earlyblight",n:M("اللفحة المبكرة / الأنثراكنوز","Early blight / anthracnose","Alternariose / anthracnose","Tizón temprano / antracnosis","早疫病 / 炭疽病","अगेती झुलसा / एन्थ्रेक्नोज़","Pinta-preta / antracnose","Alternaria / anthracnose"),
  a:M("أزل الأوراق السفلية المصابة، وتجنّب رش الماء على الأوراق، ومبيد FRAC M5 أو 11 عند الحاجة.","Remove infected lower leaves, avoid wetting foliage, FRAC M5 or 11 if needed.","Retirez les feuilles basses atteintes ; FRAC M5 ou 11 si besoin.","Quita hojas bajas afectadas; FRAC M5 u 11 si hace falta.","摘除下部病叶，避免叶面淋水，必要时用 FRAC M5 或 11。","संक्रमित निचली पत्तियाँ हटाएँ; ज़रूरत पर FRAC M5 या 11।","Retire folhas baixas afetadas; FRAC M5 ou 11 se preciso.","Verwijder aangetast onderblad; FRAC M5 of 11 indien nodig.")},
 {k:"pm",lib:"powdery",n:M("البياض الدقيقي","Powdery mildew","Oïdium","Oídio","白粉病","पाउडरी मिल्ड्यू","Oídio","Echte meeldauw"),
  a:M("كبريت ميكروني (ليس فوق 30°C) أو بيكربونات البوتاسيوم 5 غ/لتر، وافحص أعلى الأوراق.","Wettable sulfur (not above 30 °C) or potassium bicarbonate 5 g/L; check upper leaf surfaces.","Soufre (pas > 30 °C) ou bicarbonate de potassium 5 g/L.","Azufre (no > 30 °C) o bicarbonato potásico 5 g/L.","硫磺（> 30 °C 不用）或碳酸氢钾 5 g/L；检查叶面。","गंधक (30 °C से ऊपर नहीं) या पोटैशियम बाइकार्बोनेट 5 g/L।","Enxofre (não > 30 °C) ou bicarbonato de potássio 5 g/L.","Zwavel (niet > 30 °C) of kaliumbicarbonaat 5 g/L.")},
 {k:"ba",lib:"bacterialspot",n:M("التبقّع البكتيري","Bacterial spot","Tache bactérienne","Mancha bacteriana","细菌性斑点病","जीवाणु धब्बा","Mancha bacteriana","Bacterievlekken"),
  a:M("لا تلمس النباتات وهي مبتلة، ورش نحاسي وقائي بعد المطر الغزير.","Don't handle wet plants; preventive copper after heavy rain.","Ne touchez pas les plantes mouillées ; cuivre après forte pluie.","No manipules plantas mojadas; cobre tras lluvia fuerte.","植株潮湿时勿操作；大雨后预防喷铜。","गीले पौधे न छुएँ; भारी बारिश के बाद तांबा।","Não manuseie plantas molhadas; cobre após chuva forte.","Raak natte planten niet aan; koper na zware regen.")},
 {k:"sm",lib:"spidermite",n:M("العنكبوت الأحمر","Spider mites","Acariens tétranyques","Araña roja","红蜘蛛","लाल मकड़ी (माइट)","Ácaro-rajado","Spint"),
  a:M("رطّب الجو ورش الماء أسفل الأوراق، وافحص كل 3 أيام، ومبيد أكاروسي متخصص عند الإصابة.","Raise humidity, mist leaf undersides, check every 3 days, specific acaricide if infested.","Humidifiez, brumisez le revers, contrôlez tous les 3 j, acaricide si besoin.","Humedece, pulveriza el envés, revisa cada 3 días, acaricida si hay plaga.","增湿并喷叶背，每 3 天检查，发生时用专用杀螨剂。","नमी बढ़ाएँ, पत्तियों के नीचे पानी छिड़कें, हर 3 दिन जाँचें।","Umedeça, borrife o verso, verifique a cada 3 dias, acaricida se infestado.","Verhoog vocht, nevel onderkant blad, controleer elke 3 dagen.")}
];
function dayRisk(d){var o={};if(!d)return o;var tx=d.tmax,tn=d.tmin;if(tx==null||tn==null)return o;var tm=(tx+tn)/2,rh=d.rh,rx=d.rhx,rain=d.rain==null?0:d.rain,pp=d.pp;
 var hasRh=rh!=null,wet=(hasRh&&rh>=85)||(rx!=null&&rx>=95&&hasRh&&rh>=75)||rain>=2,humid=hasRh?rh>=75:(pp!=null&&pp>=60)||rain>=1;
 if(tm>=10&&tm<=24)o.lb=wet?2:(humid?1:0);
 if(tm>=12&&tm<=25)o.bo=((hasRh&&rh>=90)||rain>=5)?2:((hasRh&&rh>=85)?1:0);
 if(tm>=22&&tm<=30)o.eb=wet?2:(humid?1:0);
 if(tm>=18&&tm<=30&&rain<1)o.pm=(hasRh&&rh>=45&&rh<=80&&tx<=32)?2:((!hasRh||(rh>=40&&rh<=85))?1:0);
 if(tx>=24&&tx<=33&&rain>=5)o.ba=2;else if(tx>=24&&rain>=2)o.ba=1;
 if(tx>=30&&((hasRh&&rh<50)||(!hasRh&&rain<0.5&&tx>=33)))o.sm=2;else if(tx>=28&&(!hasRh||rh<60)&&rain<1)o.sm=1;
 return o;}
function riskList(c){if(!c||!Array.isArray(c.days))return null;var t=ymd(new Date()),fut=c.days.filter(function(d){return d&&d.d>=t;}).slice(0,3);if(!fut.length)return null;
 var out=[];RD.forEach(function(r){var lv=0,ds=[];fut.forEach(function(d){var x=dayRisk(d)[r.k]||0;if(x>lv)lv=x;if(x>=1)ds.push(dayLbl(d.d));});if(lv)out.push({r:r,lv:lv,ds:ds});});
 out.sort(function(a,b){return b.lv-a.lv||b.ds.length-a.ds.length;});return {list:out,hasRh:fut[0].rh!==undefined&&fut[0].rh!==null};}
window.__disRisk=function(){var c=wxCache();if(!c||!(Date.now()-(+c.t||0)<36*3600e3))return null;return riskList(c);};
window.__riskCard=function(host){try{host.innerHTML="";ensureCss();var c=wxCache();if(!c||!wxLoc())return;var R=riskList(c);if(!R)return;
 var card=el("div",{"class":"tlcard"});card.appendChild(el("div",{"class":"tlh"},T(RK.title)));card.appendChild(el("div",{"class":"tlnote"},T(RK.sub)));
 var hi=R.list.filter(function(x){return x.lv>=1;});if(!hi.length)card.appendChild(el("div",{"class":"tlok"},T(RK.none)));
 hi.forEach(function(x){var b=el("div",{"class":x.lv>=2?"tlwarn":"tlok",style:x.lv>=2?"":"background:#FFFBEA;color:#6b5500"});b.appendChild(el("div",{style:"font-weight:900"},(x.lv>=2?"🔴 ":"🟡 ")+T(x.r.n)+" — "+T(x.lv>=2?RK.high:RK.med)));
  b.appendChild(el("div",{style:"font-weight:600;margin-top:2px"},T(RK.days).replace("{d}",x.ds.join(L()==="ar"?"، ":", "))));b.appendChild(el("div",{style:"font-weight:600;margin-top:4px"},"→ "+T(x.r.a)));
  var lk=el("button",{"class":"tlmini",style:"margin-top:6px"},T(RK.more));lk.addEventListener("click",function(){try{ov&&ov.classList.remove("on");}catch(_){}setTimeout(function(){try{window.__openLibrary&&window.__openLibrary(null,x.r.lib);}catch(_){}},60);});b.appendChild(lk);card.appendChild(b);});
 if(!R.hasRh)card.appendChild(el("div",{"class":"tlnote",style:"margin-top:6px"},T(RK.noRh)));
 card.appendChild(el("div",{"class":"tlnote",style:"margin-top:6px"},T(RK.note)));host.appendChild(card);}catch(_){}};

})();
