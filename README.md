# Opis projektu Muscode App

Deploy projektu można obejrzec pod aderesem: [https://mpawlak92.github.io/muscodeapp/](https://mpawlak92.github.io/muscodeapp/)

Aplikacja dzieli się na dwie części. Jedną z nich jest lista todo natomiast druga jest związana z wyświetlaniem i edycją danych o produkcie. Aplikacja pozwala na dodawanie zadań oraz oznaczanie ich jako ukończone. W części związanej z produktami aplikacja pozwala na zaprezentowanie danych o produktach w postaci tabeli oraz kart, cenach produktów przed i po obniżce a także wartości procentowej upustu. Pozwala również na edycję podstawowych danych produktu, takich jak nazwa, cena przed i po obniżce oraz waluta.

# Podsumowanie i dokumentacja projektu

Zacznę od podsumowania prac nad projektem. I tu na początek muszę powiedzieć że zwarzywszy na to, że przed zaczęciem projektu (około 6 dni temu) nie miałem żadnej styczności z freamvorkiem VUE.js, jestem bardzo zadowolony z pracy z nim, szybkości, i łatwosci nauki oraz efektów uzyskanych z jego pomocą. W trakcie pisania projektu nie napotkałem żadnych przeszkód poza przypadkami gdzie to właśnie nieznajomość freamworka opóżniała moje pracę, przykładem może być renderowanie obrazków w kartach produktu wymagające tłumaczenia ścieżek do lokalnych zasobów.

# Założenia projektowe

Zapewnienie poniższych funkcjonalności:

Funkcjonalości ogólne:

- zapewnienie accessibility, możliwości przeglądania za pomocą klawiatury, czytników ekranów
- zapewnienie responsywności aplikacji

Lista ToDo:

- wyświetlanie zadań todo,
- dodawanie zadań do listy todo,
- licznik wykonanych zadań reagujący na zaznaczenie checkboxa,
- usuwanie zadań z listy (funkcjonalność dodatkowa nie wspomniana w wymaganiach do projektu)

Tabela Produktów:

- wyświetlanie w tabeli produktów,
- dane w tabeli powinny regować na zmiany danych w kartach,
- po umieszczeniu kursora myszy nad wierszem tabeli wiersz powinien zmienic kolor tła,
- cena promocyjna jeśli jest rowna 0 nie powinna byc wyświetlana,
- w przypadku ustawienia obu cen na 0, wyświetli się informacja o braku produktu (funkcjonalność dodatkowa nie wspomniana w wymaganiach do projektu)

Karta Produktu:

- dynamicznie renderowane karty na podstawie danych użytytch w tabeli produktów,
- wyświetlanie nazwy produktu,
- wyświetlanie szarfy z watością rabatu na produkt wyrażoną w procentach,
- w przypadku braku ceny promocyjnej szarfa nie będzie wyświetlana,
- wyświetlanie grafiki produktu,
- wyświetlanie ceny po rabace wraz z walutą oraz poniżej, przekreślonej ceny podstawowej produktu wraz z walutą,
- jesli cena promocyjna jest równa 0 wtedy cena podstawowwa wyświetla się w miejscu ceny promocyjnej natomiast pod spodem nie wyświetla się żadna inna kwota,
- w przypadku ustawienia obu cen na 0, wyświetli się informacja o braku produktu (funkcjonalność dodatkowa nie wspomniana w wymaganiach do projektu)

Modal do edycji danych o produkcie:

- wyświetlanie nazwy edytowanego produktu,
- wyświetlanie grafiki produktu, bez możliwości edycji,
- zapewnienie możliwości edycji danych takich jak: Nazwa produktu, Cena, Cena promocyjna, waluta,
- informacje o produkcie będą automatycznie pobrane po otworzeniu modala,
- pole wyboru waluty ma być selectem i pozwala na wybór jednej z następujących walut: $, PLN, EUR,
- przycisk anuluj, zamykający modal bez wprowadzania zmian,
- przycisk zapisz wprowadzający zmiany do produktu,
- walidacja formularza przed zapisaniem oraz w trakcie edycji (funkcjonalność dodatkowa nie wspomniana w wymaganiach do projektu)

Technologie:

- vue.js w wersji 3 lub wyższej
- pinia
- sass
- github (strategia branchingu: z uwagi na projekt jednoosobowy zastosowałem uproszczone podejście trunk based development)
- axeDevTool (narzędzie do oceny accesibility)

# Decyzje projektowe

Funkcjonalości ogólne:

- z uwagi na formę zadania, którą był widok desctopowy, wyjątkowo odszedłem od podejścia mobile first i postanowiłem responsywnośc potraktować jako dodatkową funkcjonalność

Lista ToDo:

- użycie state managera (Pinia) było podyktowane brakiem wystarczającej znajomości freameworka vue, aktualnie zrobił bym to z wykorzystaniem "event bus", niestety nie wystarczyło czasu na poprawki,
- z powodu braku czasu na dodanie dodatkowej fukncjonalnosci, rzeczy związane z accessibility, responsywnością czy walidacją miały większy priorytet,

Tabela Produktów:

- udało się spełnić wszystkie założenia,
- decyzja o stylowaniu zanaczników zamiast nadania im klas została podjęta z uwagi na to, że projekt jest jedynie wycinkiem rzeczywistej aplikacji, w każdym innym przypadku do stylowania tabeli użył bym klas,
- z uwagi na formę tabeli nie nadającą się na wąskie ekrany mobline, oraz to, że nie wprowadza ona żadnej dodatkowej funkcjonalności poza podglądem danych w innej formie, nie jest ona wyświetlana na ekranach mniejszych niż 600px(na urządzeniach mobilnych typu telefon, aby obejrzeć tabelę trzeba obrócic telefon do pozycji horyzontalnej)

Karta Produktu:

- udało się spełnić wszystkie założenia,
- dodałem nie wspomniane w wymaganiach zachowanie na najechanie kursora myszy w postaci lekkiego powiekszenia karty, z uwagi na zwiekszenie czytelnosci faktu że obiekt jest klikalny
-

Modal do edycji danych o produkcie:

- udało się spełnić wszystkie założenia,
- po otworzeniu modala dodałem automatyczny focus na pierwszy input
- inputy są dodane ręcznie z uwagi na wielkość projektu, można by stworzyć osobny komponent z wzorcem inputa jednak w tym wypadku to przerost formy nad treścia,
- zamknięcie modala możlwie jest po kliknięciu anuluj lub zapisz oraz po wcisnięciu klawisza escape pod warunkiem że któryś element modala po focus,
- celowo nie dodałem możlwiosci zamknięcia modala przez kliknięcie w backdrop z uwagi na formę modala - nie chciałbym, aby użytkownik zamknął modal i utracił edytowane dane przypadkowym kliknięciem myszy w backdrop

Technologie:

- do walidacji formulaża użyłem paczki [vuealidate](https://vuelidate-next.netlify.app/)

## Instalacja Aplikacji

Do lokalnego odpalenia projektu wymagany jest zainstalowany globalnie Node.js w wersji 18 lub wyższej

Aby pobrać projekt trzeba przejść do [repozytorium](https://github.com/mpawlak92/muscodeapp) i wybrac jedną z opcji dostępnych pod przyciskiem "<> Code"

![Przycisk z funkcją pobrania kodu źródłowego ](/src/assets/documentation/git-code.jpg)

## Instalacja paczek

Aby zainstalować paczki należy otworzyć projekt w wybranym IDE polecany Visual Studio Code oraz zainstalować paczki przy pomocy polecenia "npm instal"

```sh
npm install
```

## Kompilacja projektu

Aby skompilowac projekt trzeba użyć polecenia npm run

```sh
npm run dev
```
