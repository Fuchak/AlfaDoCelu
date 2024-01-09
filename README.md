README made by Fuczi

# Afla Do Celu

Projekt aplikacji do zamawiania alfy jako taxi.

## Wymagania

- XAMPP (Aktualnie baza zdalnie na https://www.db4free.net/phpMyAdmin/ )
- Login: - `student3`
- Hasło: - `student3`
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
2. Tworzymy użytkownika `student3` z hasłem `student3` (serwer lokalny).
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

## Proces Commitowania za pomocą Git Bash

### Pierwsze połączenie gita z folderem/projektem na GitLab
1. git init
2. git remote add origin https://orkan.tu.kielce.pl/gitlab/Fuczak/afla-do-celu.git
3. git status  (Sprawdzenie statusu czy coś się zmieniło w sumie można chyba olać?)
4. git pull origin master
5. git add --all
6. git commit -m "tekst commita"
7. git push origin master

### Drugie połączenie już wysyłamy przez Visual Studio Code
- Z lewej strony na pasku mamy ikonkę Source Control (`Ctrl+Shift+G`).
- Dodajemy wszystkie modyfikowane pliki, które chcemy wrzucić do commita, plusikiem obok `M`.
- Opisujemy naszego commita.
- Niebieski przycisk z listy rozwijanej wybieramy "Commit & Sync".

## Licencja

Licencji brak.

## Autorzy

- Hubert Futrzyński aka Fuczi 
- Mateusz Szczepański
- Hanna Sokół
