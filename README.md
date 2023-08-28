<p align="center"><img src="./app/assets/images/ChronikaLogo.png" width="150px" height="150px" alt="aventium softworks"></p>

<h1 align="center">Chronika Launcher</h1>

<em><h5 align="center">(A <a href="https://github.com/dscalzi/HeliosLauncher" title="Helios Launcher">Helios Launcher</a>-ből forkolva)</h5></em>

[<p align="center"><img src="https://img.shields.io/github/actions/workflow/status/ChronikaMC/Launcher/build.yml?branch=master&style=for-the-badge" alt="gh actions">](https://github.com/ChronikaMC/Launcher/actions) [<img src="https://img.shields.io/github/downloads/ChronikaMC/Launcher/total.svg?style=for-the-badge" alt="downloads">](https://github.com/ChronikaMC/Launcher/releases) [<img src="https://img.shields.io/github/release/ChronikaMC/Launcher.svg?style=for-the-badge" alt="downloads">](https://github.com/ChronikaMC/Launcher/releases/latest)

<p align="center">Csatlakozz egyszerűen java és modok telepítése nélkül alig pár kattintással!</p>

![Screenshot 1](https://i.imgur.com/6o7SmH6.png)
![Screenshot 2](https://i.imgur.com/x3B34n1.png)

## Funkciók

* 🔒 Teljes fiók kezelés.
  * Adj hozzá akár több fiókot és könnyen váltogathatsz közöttük.
  * Microsoft (OAuth 2.0) + Mojang (Yggdrasil) hitelesítés teljes támogatása.
  * A bejelentkezési adatokat nem tároljuk, közvetlen a Mojang felé továbbítjuk.
* 📂 Hatékony frissítéskezelés.
  * Automatikusan frissül amint megjelenik egy új verzió.
  * A fájlok ellenőrzésre kerülnek indítás előtt. A hibás fájlok újra le lesznek töltve.
* ☕ **Automatikus Java ellenőrzés.**
  * Mindig a *neked megfelelő* java verziót telepítjük.
  * Nem kell Java-t telepítened a launcher futtatásához.
* 📰 Beépített hírek a launcherben.
* ⚙️ Intuitív beállításkezelés, Java beállításokkal együtt.
* Támogatja a szervereinket.
  * Könnyen váltogathatsz a verziók között.
  * Kiírja a szerveren lévő online játékosokat.
* Automatikus frissítések. Igen, a launcher saját magát frissíti.
*  Mojang szolgáltatásainak állapotának megtekintése.

És ez még nem a teljes lista. Töltsd le és telepítsd a launchert, és fedezd fel!

#### Segítségre van szükséged? [Látogass el a Discord szerverünkre.](https://dc.chronika.hu)

#### Tetszik a projektünk? Hagyj egy ⭐ csillagot rajta!

## Letöltés

A launchert le tudod tölteni a [GitHub Releases](https://github.com/ChronikaMC/Launcher/releases) oldalról

#### Legújabb stabil verzió

[![](https://img.shields.io/github/release/ChronikaMC/Launcher.svg?style=flat-square)](https://github.com/ChronikaMC/Launcher/releases/latest)

#### Legújabb bétaverzió
[![](https://img.shields.io/github/release/ChronikaMC/Launcher/all.svg?style=flat-square)](https://github.com/ChronikaMC/Launcher/releases)

**Támogatott Platformok**

Ha a [Releases](https://github.com/ChronikaMC/Launcher/releases) oldalról töltöd le, válaszd a rendszerednek megfelelő telepítőt (lásd lentebb).

| Platform | Fájl |
| -------- | ---- |
| Windows x64 | `Chronika-Launcher-setup-VERSION.exe` |
| macOS x64 | `Chronika-Launcher-setup-VERSION-x64.dmg` |
| macOS arm64 | `Chronika-Launcher-setup-VERSION-arm64.dmg` |
| Linux x64 | `Chronika-Launcher-setup-VERSION-x86_64.AppImage` |
| Linux arm64 | `Chronika-Launcher-setup-VERSION-arm64.AppImage` |

## Konzol

A konzol megnyitásához használd a következő kombinációt:

```console
ctrl + shift + i
```

Győződj meg róla, hogy a Console fül van nyitva. Ne illessz be semmit a konzolba, hacsak nem vagy benne 100% biztos, hogy tudod mit csinál. Akár fel is törhetnek ezzel.

#### Kimenet mentése fájlba

Ha le akarod menteni a konzol kimenetet, egyszerűen kattints jobb egérgombbal valahová a konzolra, majd kattints a **Save as..** gombra.

![console example](https://i.imgur.com/T5e73jP.png)


## Fejlesztés

Lentebb részletezzük a fejlesztés folyamatát, ha közre szeretnél működni a projektben, vagy saját magadnak szeretnéd buildelni a launchert.

### Előkészületek

**Rendszerkövetelmények**

* [Node.js][nodejs] v18

---

**Projekt klónozása és a függősségek telepítése**

```console
> git clone https://github.com/ChronikaMC/Launcher.git
> cd HeliosLauncher
> npm install
```

---

**Indítás**

```console
> npm start
```

---

**Telepítők buildelése**

Buildelés saját platformra:

```console
> npm run dist
```

Buildelés specifikus platformra:

| Platform    | Parancs              |
| ----------- | -------------------- |
| Windows x64 | `npm run dist:win`   |
| macOS       | `npm run dist:mac`   |
| Linux       | `npm run dist:linux` |

MacOS-re való buildelés nem működik Windows/Linux alatt, és fordítva sem.

---

### Visual Studio Code

A fejlesztéshez a [Visual Studio Code][vscode] használata ajánlott.

Másold be a következőt a `.vscode/launch.json` fájlba:

```JSON
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Main Process",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "program": "${workspaceFolder}/node_modules/electron/cli.js",
      "args" : ["."],
      "outputCapture": "std"
    },
    {
      "name": "Debug Renderer Process",
      "type": "chrome",
      "request": "launch",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      },
      "runtimeArgs": [
        "${workspaceFolder}/.",
        "--remote-debugging-port=9222"
      ],
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

Ez két debug konfigurációt fog hozzáadni.

#### Debug Main Process

Ez lehetővé teszi a hibakeresést a [fő folyamaton][mainprocess]. A [frontend folyamatokat][rendererprocess] a fejlesztői eszközökkel tudod megvizsgálni.

#### Debug Renderer Process

Ez lehetővé teszi a hibakeresést a [frontend folyamatokon][rendererprocess]. Ehhez telepítened kell a [Debugger for Chrome][chromedebugger] bővítményt.

Megjegyzés: **nem tudod** megnyitni a fejlesztői ablakot amíg ez a hibakeresési konfiguráció aktív. Chromium csak egy debuggert enged, egy második megnyitása összeomláshoz vezethet.

---

### Ha felhasználod a projektet

Nevezd meg az eredeti készítőt és jelezd egy linkkel az eredeti forrást.  
Ez egy szabad szoftver, legalább ennyivel tiszteld meg.

A Microsoft Hitelesítés beállításához lásd https://github.com/ChronikaMC/Launcher/blob/master/docs/MicrosoftAuth.md.

---

## Linkek

* [Helios Launcher](https://github.com/dscalzi/HeliosLauncher)
* [Helios Launcher Wiki][wiki]
* [Nebula (Distribution.json létrehozása)][nebula]

Ha fel szeretnéd venni velünk a kapcsolatot, azt Discordon megteheted.

[![discord](https://discordapp.com/api/guilds/556817619844464650/embed.png?style=banner3)][discord]

---

### Jó szórakozást kívánunk!


[nodejs]: https://nodejs.org/en/ 'Node.js'
[vscode]: https://code.visualstudio.com/ 'Visual Studio Code'
[mainprocess]: https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes 'Main Process'
[rendererprocess]: https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes 'Renderer Process'
[chromedebugger]: https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome 'Debugger for Chrome'
[discord]: https://dc.chronika.hu 'Discord'
[wiki]: https://github.com/dscalzi/HeliosLauncher/wiki 'wiki'
[nebula]: https://github.com/dscalzi/Nebula 'dscalzi/Nebula'
