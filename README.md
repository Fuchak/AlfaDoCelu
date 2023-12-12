# Afla Do Celu

Projekt aplikacji do zamawiania alfy jako taxi.

## Wymagania

- XAMPP
- NODE.js
- Visual Studio Code

## Konfiguracja

### Serwer
W folderze "serwer" zainstaluj zależności node.js używając poniższych komend:
    - npm init -y
    - npm install express mysql bcrypt body-parser cors bcrypt jsonwebtoken (Sprawdzić czy to działa)
    - npm install -g nodemon

### Aplikacja
W folderze "aplikacji" zainstaluj zależności node/expo używając poniższych komend:
    - npm install -g expo-cli
    - npm install react react-native
    - npm install @react-navigation/native
    - npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
    - npm install @react-native-async-storage/async-storage

### XAMPP:
1. Startujemy Apache i MySQL.
2. Tworzymy użytkownika `student3` z hasłem `student3` (serwer lokalny).
3. Tworzymy bazę danych `afladocelu`.
4. Tworzymy tabele (z pliku `Baza_Creaty.txt`).

### Node.js:
1. Otwieramy jako administrator konsolę w folderze serwera i wpisujemy komendę: `nodemon server.js`.
   
   Obsługa tej konsoli:
   - `rs` - restart
   - `CTRL+C` - stop

## Proces Commitowania za pomocą Git Bash

### Pierwsze połączenie gita z folderem/projektem na GitLab
- git init
- git remote add origin https://orkan.tu.kielce.pl/gitlab/Fuczak/afla-do-celu.git
- git status  (Sprawdzenie statusu czy coś się zmieniło w sumie można chyba olać?)
- git pull origin master
- git add --all
- git commit -m "tekst commita"
- git push origin master

### Drugie połączenie już wysyłamy przez Visual Studio Code
- Z lewej strony na pasku mamy ikonkę Source Control (`Ctrl+Shift+G`).
- Dodajemy wszystkie modyfikowane pliki, które chcemy wrzucić do commita, plusikiem obok `M`.
- Opisujemy naszego commita.
- Niebieski przycisk z listy rozwijanej wybieramy "Commit & Sync".

## Uruchamianie Programu

1. W folderze aplikacji otwieramy konsolę i wpisujemy polecenie: `npx expo start`.
2. Zmieniamy w pliku `config.js` adres na ten wyświetlony przez Metro Bundlera.
3. W aplikacji Expo Go na telefonie Android skanujemy kod QR.

   UWAGA! Telefon musi być w tej samej sieci co komputer, z którego uruchamiamy aplikację.

## Licencja

Licencja na podstawie przywłaszczenia essa.

## Autorzy i Wkład

- Hubert Futrzyński aka Fuczi
- Mateusz Szczepański
- Hanna Sokół