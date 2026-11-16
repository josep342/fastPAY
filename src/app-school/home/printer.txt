

import {
  EscPosPrinter,
  BluetoothPrinter
} from '@fedejm/capacitor-esc-pos-printer';

async imprimer() {

  await EscPosPrinter.requestBluetoothEnable();

  const { devices } = await EscPosPrinter.getBluetoothPrinterDevices();

  console.log(devices);

  const pt210 = devices.find(
    d => d.name.includes('PT210') ||
         d.name.includes('MTP')
  );

  if (!pt210) {
    alert('PT210 non trouvée');
    return;
  }

  const printer =

    new BluetoothPrinter(pt210.address);

  await printer.link();
  await printer.connect();

  // Initialisation ESC/POS
  await printer.send([
    0x1B, 0x40
  ]);

  // Texte

  const texte =
    'GOOJPRT PT210\n' +
    '------------------------\n' +
    'Test impression\n' +
    'Bonjour depuis Ionic\n' +
    '------------------------\n\n\n';

  const data =
    Array.from(new TextEncoder().encode(texte));

  await printer.send(data);

  // Avancer le papier
  await printer.send([
    0x0A,
    0x0A,
    0x0A
  ]);

  await printer.disconnect();
  await printer.dispose();

  alert('Impression terminée');

}
