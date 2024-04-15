README made by Fuczi

# Afla Do Celu

Projekt aplikacji do zamawiania alfy jako taxi.

## Wymagania

- XAMPP (Aktualnie baza zdalnie na https://www.db4free.net/phpMyAdmin/ )
- Login: - `------`
- Hasło: - `------`
- NODE.js (Aktualnie serwer zdalnie na https://glitch.com/edit/#!/substantial-winter-kingfisher?path=server.js%3A4%3A29 )
- Visual Studio Code

## Konfiguracja

### Aplikacja
W folderze "aplikacji" zainstaluj zależności node/expo używając poniższych komend:
- npm install 
- npx expo install --fix (Jeśli potrzebne)

### Serwer (Jeśli lokalny)
W folderze "serwer" zainstaluj zależności node.js używając poniższych komend:
- npm init -y
- npm install express mysql bcrypt body-parser cors bcrypt jsonwebtoken (Sprawdzić czy to działa)
- npm install -g nodemon

 1. Obsługa:
Otwieramy jako administrator konsolę w folderze serwera:
   - `nodemon server.js` - start 
   - `rs` - restart
   - `CTRL+C` - stop

### XAMPP (Jeśli lokalny)
1. Startujemy Apache i MySQL.
2. Tworzymy użytkownika `------` z hasłem `------` (serwer lokalny).
3. Tworzymy bazę danych `afladocelu`.
4. Tworzymy tabele (z pliku `Baza_Creaty.txt`).

## Uruchamianie Programu

1. W folderze aplikacji otwieramy konsolę i wpisujemy polecenie: 
 - `npx expo start` (jeśli mamy telefon w tej samej sieci)
 - `npx expo start --tunnel` (jeśli mamy telefon w innej sieci)
2. W aplikacji Expo Go na telefonie Android skanujemy kod QR.
3. Przykładowe konto do zalogowania
	- Login: - `518050511`
	- Hasło: - `Kargo2001!`

<h2>Screenshots</h2>
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/7d813bb5-39c0-4ef3-b7d2-1d8802a6b599" width="200" alt="Choose Create User Method">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/8817a268-8b90-4a3f-812e-74c02d5bdb08" width="200" alt="Create User">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/55264ea9-aad9-49b0-8cac-f389f2f427a7" width="200" alt="Code">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/8d728029-9216-4bd6-b2dc-697ff05906e0" width="200" alt="Login">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/5d7f6f6a-eeb3-4ac2-824e-342a93e8cd8c" width="200" alt="Main Map">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/bcc6199e-a570-4669-b16c-008f475fe515" width="200" alt="Rate">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/c7a5d9f8-1a0e-4155-a810-0dbd7b77ec34" width="200" alt="Ride Main Map">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/a00ee224-6ff8-4296-a008-c50abe5cc86c" width="200" alt="Choose Driver">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/fdd5f6f5-2828-4044-8503-9f58aad019bf" width="200" alt="Choose Payment Method">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/45fa98af-0a43-45b4-9019-20358b1b1d70" width="200" alt="Help">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/5726e6a6-19c9-4448-9787-c25b19c0a68e" width="200" alt="Ride History">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/774f08ba-9a2e-45d3-aba8-9ba832e763a3" width="200" alt="Chose Driver">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/2fe556d7-088d-4afe-b985-6f688bcab4cf" width="200" alt="Choose Payment Method">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/b03eefb5-0e70-4f73-b873-946514e9954a" width="200" alt="Help">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/fad3b4b5-d504-413d-9750-0b33799abb58" width="200" alt="Ride History">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/491d6f96-f800-4e1e-b267-56955cb1ba93" width="200" alt="Wallet">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/a4384a31-59cf-4966-b51a-06de16009590" width="200" alt="Settings">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/f7df7e3c-6639-4eac-87f0-42fb9218a126" width="200" alt="Profile">
<img src="https://github.com/Fuchak/AlfaDoCelu/assets/103064805/3b7d5853-5575-49ac-a204-130745cda93f" width="200" alt="Notification">

## Licencja

Unlicense

## Autorzy

- Hubert Futrzyński aka Fuczi 
- Mateusz Szczepański
- Hanna Sokół
