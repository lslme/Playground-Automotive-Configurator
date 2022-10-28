// Import stylesheets
import './style.css';

// Write Javascript code!
const appName = 'Playground Automotive v0'; // Put application name here
const server = 'https://wr-lumis3d.lumiscaphe.com'; // Put server URL here
const databaseId = 'e8190c1e-5d8c-4554-a7f4-e6c372dace88'; // Put database ID here

const vehicleName = 'CLIO Equilibre'; // Put vehicle name here
const defaultImg = // Put default vehicle image URL here
  'https://wr-lumis3d.lumiscaphe.com/ImageFromBookmark?databaseId=e8190c1e-5d8c-4554-a7f4-e6c372dace88&configuration=ABLAVI/AEBS07/AIRBDE/AIVCT/ALEVA/ATAR03/AVCAEC/AVGSI/AVOSP1/BJA/BVM6/CA02/CHBASE/CPE/CSRGAC/DG/DLIGM2/DRA/DRAP02/DWGE01/EA3/ECLHB6/ECOMOD/ESPHSA/ESS/EV3GA1/FEUAR4/FPAS2/H4D/HARM02/HYB01/ITPK1/KM/KTGREP/LVAREI/M2018/MCSOL2/MET04/MLEXP1/NA40A/NOADR/NOCAM/NOLIE/NOLII/PANP02/PERC01/PERG05/PGPRT2/PRCHR1/PROJ4/RCALL/RET04/RETC/RETRCR/RV/SANA07/SANACF/SDANGM/SGAR02/SGAV03/SKTPOU/SOP03C/SPERTA/SPERTB/SPERTP/SPERTS/SPROJA/SRANCF/SREACT/SSADPC/SSAPLC/SSRCAR/STANDA/STHABT/TLRP00/VLMOU1/VT/OV369/RDIF10/RTOL16&bookmarkSet=TOURNETTE&bookmark=Ext_1&width=1920&height=1080&imageFormat=jpeg&quality=80';

const VCD =
  'ABLAVI/AEBS07/AIRBDE/AIVCT/ALEVA/ATAR03/AVCAEC/AVGSI/AVOSP1/BJA/BVM6/CA02/CHBASE/CPE/CSRGAC/DG/DLIGM2/DRA/DRAP02/DWGE01/EA3/ECLHB6/ECOMOD/ESPHSA/ESS/EV3GA1/FEUAR4/FPAS2/H4D/HARM02/HYB01/ITPK1/KM/KTGREP/LVAREI/M2018/MCSOL2/MET04/MLEXP1/NA40A/NOADR/NOCAM/NOLIE/NOLII/PANP02/PERC01/PERG05/PGPRT2/PRCHR1/PROJ4/RCALL/RET04/RETC/RETRCR/RV/SANA07/SANACF/SDANGM/SGAR02/SGAV03/SKTPOU/SOP03C/SPERTA/SPERTB/SPERTP/SPERTS/SPROJA/SRANCF/SREACT/SSADPC/SSAPLC/SSRCAR/STANDA/STHABT/TLRP00/VLMOU1/VT'; // Put VCD (without color and wheels ref.) here

const colors = {};
/* Put vehicle colors below */
colors['Glacier White'] = 'OV369';
colors['Celadon Blue'] = 'TERQT';
colors['Diamond Black'] = 'TEGNE';
colors['Iron Blue'] = 'TERQH';
colors['Titanium Grey'] = 'TEKPN';
colors['Mercury'] = 'TED69';
colors['Quartz White'] = 'TEQNY';
colors['Flame Red'] = 'TENNP';
colors['Valencia Orange'] = 'TEEQB';

const wheels = {};
/* Put vehicle wheels below */
wheels['16" Amicitia Flex Wheels'] = 'RDIF10/RTOL16';
wheels['16" Philia Diamond Cut Alloy White Black Inserts'] = 'RDIF13/RALU16';
wheels['17" Viva Stella Diamond Cut Alloy With Black Inserts'] =
  'RDIF20/RALU17';
wheels['17" Viva Stella Diamond Cut Alloy With Grey Inserts'] = 'RDIF21/RALU17';

const views = {};
/* Put views here */
views['Exterior'] = 'TOURNETTE';
views['Wheel'] = 'Ext_Wheel';
views['Color'] = 'Ext_Color';

const sizes = {};
/* Put image size here */
sizes['16:9'] = '1920x1080';
sizes['1:1'] = '100x100';

// From here on, don't touch anything

document.getElementById('appName').textContent = appName;
document
  .getElementById('appDB')
  .setAttribute('href', `${server}/Database?databaseId=${databaseId}`);

const appViewer = document.getElementById('appViewer');
appViewer.setAttribute('src', defaultImg);
appViewer.setAttribute('alt', vehicleName);
document.getElementById('generatedUrl').textContent = defaultImg;

addOptions('color', colors);
addOptions('wheels', wheels);
addOptions('bookmarkSet', views);
addOptions('size', sizes);

const appForm = document.getElementById('appForm');

appForm.addEventListener('input', () => {
  const url = generateUrl();
  document.getElementById('generatedUrl').textContent = url;
  const appViewer = document.getElementById('appViewer');
  appViewer.setAttribute('src', url);
  const width = document.getElementById('size').value.split('x')[0];
  const height = document.getElementById('size').value.split('x')[1];
  appViewer.setAttribute('width', width);
  appViewer.setAttribute('height', height);
});

function addOptions(id, data) {
  for (const [key, value] of Object.entries(data)) {
    const select = document.getElementById(id);
    const option = document.createElement('option');
    select.appendChild(option);
    option.value = value;
    option.textContent = key;
  }
}

function generateUrl() {
  const formData = new FormData(appForm);

  let color = formData.get('color');
  let wheels = formData.get('wheels');

  let config = `${VCD}/${color}/${wheels}`;

  let bookmarkSet = formData.get('bookmarkSet');
  let bookmark;

  if (bookmarkSet === 'TOURNETTE') {
    bookmark = `Ext_${formData.get('bookmark')}`;
    if (bookmark === 'Ext_null') {
      let value = '1';
      bookmark = `Ext_${value}`;
      document.getElementById('bookmark').value = value;
      formData.set('bookmark', value);
    }

    document.getElementById('bookmark').removeAttribute('disabled');
    const angleOfView = parseInt(formData.get('bookmark'), 10) * 15;
    document.getElementById('angleOfView').textContent = angleOfView;
  } else {
    document.getElementById('bookmark').setAttribute('disabled', 'disabled');
    bookmark = bookmarkSet;
  }

  const width = formData.get('size').split('x')[0];
  const height = formData.get('size').split('x')[1];

  const format = formData.get('format');
  const quality = formData.get('quality');
  document.getElementById('imageQuality').textContent = quality;

  return `${server}/ImageFromBookmark?databaseId=${databaseId}&configuration=${config}&bookmarkSet=${bookmarkSet}&bookmark=${bookmark}&width=${width}&height=${height}&imageFormat=${format}&imageQuality=${quality}`;
}
