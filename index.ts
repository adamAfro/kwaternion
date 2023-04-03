import { contentType } from "https://deno.land/std@0.177.0/media_types/mod.ts"
import { DOMParser, Element, Document } from "https://deno.land/x/deno_dom@v0.1.35-alpha/deno-dom-wasm.ts"
import { getNetworkAddr } from "https://deno.land/x/local_ip@0.0.3/mod.ts"
import { render } from "https://deno.land/x/gfm/mod.ts"
import html from "https://cdn.jsdelivr.net/gh/adamAfro/inlineCSS@master/html.ts"

namespace Color {
    export const blue = "#51c0eb"
    export const black = "#000000"
    export const white = "#ffffff"
}

new class Kwaternion {

    /** Pracownik uczelni */
    curator = "dr hab. Anna Kuczmaszewska" // 💂



    /** Zarząd */
    representatives = new Map([
        ["Prezes", { name: "Karol Warmiński", photo: "photo/Karol.webp" }],
        ["Wiceprezes", { name: "Faustyna Smarzewska", photo: "photo/Faustyna.webp" }],
        ["Sekretarz", { name: "Cezary Żak", photo: "photo/Cezary.webp" }]
    ]) // 🚢



    /** Akutalności */
    news = [...Deno.readDirSync("./news")].filter(entry => entry.isFile && entry.name.endsWith(".md")) // folder „news”
        .map((file) => [file.name, render(Deno.readTextFileSync("./news/" + file.name))]).map(([name, content]) => {

            content = content.replaceAll(" -- ", " – ")
            const container = (new DOMParser().parseFromString(content, "text/html") as Document).body as Element
            const title = (container.querySelector("h1") as Element)?.innerText || "?"
            const href = "/news/" + name.slice(0, name.lastIndexOf("."))
            const images = [...container.querySelectorAll("img")] as Element[]
            
                images.forEach(image => image.setAttribute("src", "/" + image.getAttribute("src")?.slice("static/".length)))

            const preview = container.getElementsByTagName("p").map(p => p.innerText).join("\n").slice(0,128) + "..."
            const img = images[0]?.getAttribute("src")

            return { title, href, img, preview, content: container.innerHTML }
        }) // 🗞


    /** 📑 Strona HTML */
    website = html`

        <html lang="pl">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Kwaternion - Koło Naukowe Politechniki Lubelskiej</title>

                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Lato&family=Mynerve&family=Playfair+Display&display=swap" rel="stylesheet">

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
                <link rel="manifest" href="/site.webmanifest">



                <!-- Tekst artykułów -->
                <style>
                    body > article > main {
                        font: 1.24em Lato, sans-serif;
                        padding: 0 1.4em; width: 48em;
                        max-width: calc(100% - 4.8em); margin: 1em auto;
                        margin-bottom: 10em;
                        overflow-x: hidden;
                    } body > article > main > h1 {
                        font: 1.24em Mynerve, sans-serif;
                        font-weight: bold;
                        margin-bottom: 2.4em;
                    }
                </style>



                <!-- Obrazki w artykułach -->
                <style>
                    body > article > main > p img {
                        width: 18em;
                        border-radius: 2em;
                        margin-left: 20%;
                        animation: pop-in .5s;
                        transition: transform 1s;
                        padding: 1em;
                    } body > article > main > p:nth-child(odd) img { 
                        margin-left: 40%;
                    } body > article > main > p img:hover {
                        transform: scale(1.2)
                    }
                </style>


            </head>

            <body font="calc(6pt + .24vw) Lato, sans-serif" min-width="320px"
                margin="0" border="0" padding="0" background-image="url(/grid.svg)"
                narrow-font-size="calc(8pt + .18vw)"
                medium-font-size="12pt">

                <article min-height="100vh">

                    <header display="flex" flex-flow="column" align-items="center">

                        <img src="/logo.svg"
                            alt="jk = -kj = i\n kwadrat i = kwadrat j = kwadrat k = -1\n kj = -ik = j"
                            width="24em">

                        <h1 font="3.6em Playfair, serif" margin="0" font-family="serif"><a href="/">Kwaternion</a></h1>

                        <p font-size="1.2em">Koło Naukowe Politechniki Lubelskiej</p>

                    </header>



                    <section display="flex" flex-flow="column" align-items="center" position="relative" padding-bottom="6em" 
                        max-width="128em" margin="auto">
                        <h2>Członkowie</h2>



                        <p position="absolute" left="0" top="2.4em" z-index="2">

                            <a href="#kontakt" display="block" width="16em" height="1.2em" 
                                padding=".4em" text-align="right" widest-text-align="center"
                                color="${Color.white}" background-color="${Color.blue}">Dołącz do nas!</a>
                        </p>



                        <ul list-style="none" padding="1em" margin="1em"
                            display="flex" gap="calc(1em + 1vw)">

                        ${[...this.representatives].map(([role, { name, photo }]) => /*html*/`

                            <li position="relative" >

                                <img display="block" width="10em" height="10em" src="/${photo}"/>
                                <p position="absolute" z-index="1" bottom="3em" right="0" width="min-content"
                                    background-color="${Color.white}" color="${Color.black}">${name}</p>
                                <p><b>${role}</b></p>

                            </li>

                        `).join('')}</ul>




                        <section position="relative" margin-left="-16em">
                            <h3 display="none">Pozostali członkowie</h3>

                            ${[ [0,0, 3.2, "photo/stockpeople-1.webp"],
                                [4,1.6, 3.2, "photo/stockpeople-2.webp"],
                                [.8,4.4, 2.4, "photo/stockpeople-3.webp"],
                                [4.2,6, 1.8, "photo/stockpeople-4.webp"]
                            ].map(([x,y,r, src], i) => /*html*/`

                                <img position="absolute" left="${x}em" top="${y}em" 
                                    background-color="${Color.blue}" width="${r}em" height="${r}em"
                                    border-radius="${.32*<number>r}em"
                                    src="/${src}"/>

                            `).join('')}

                            <p font="1.2em Mynerve"
                                margin-top="6.0em" padding-left="5.8em">

                                ... i pozostała<br/> 9-ka
                            </p>

                        </section>




                        <section position="absolute" right="0" bottom="0" wide-top="-16em">
                            <h3 display="none">Prowadzący</h3>

                            ${[ [18], [24, "Koło prowadzi " + this.curator], [16]
                            ].map(([width, content = ""], i) => /*html*/`

                                <p width="${width}em" height="1.2em"
                                    padding=".4em" margin-bottom="1em" margin-left="auto"
                                    color="${Color.white}" background-color="${Color.blue}" opacity=".8">
                                    ${content}
                                </p>

                            `).join('')}

                        </section>


                    </section>



                    <nav display="flex" flex-flow="column" align-items="center" position="relative"
                        max-width="96em" margin="auto" justify-content="center"
                        wide-flex-flow="wrap row" wide-padding="2em" wide-gap="2em" widest-gap="4em"
                        wide-align-items="start">
                        <h2 font="2.4em Playfair, serif" margin-top="3.2em"
                            wide-position="absolute" wide-margin="0" wide-top="-1em" wide-left="2em">Aktualności</h2>

                        ${this.news.slice(0,2).map(({title, href, img, preview }, i) => (i % 2) ? /*html*/`

                            <p display="flex" gap="1em" max-width="32em" align-items="center"
                                wide-margin-top="${i * 10}em">

                                <a href="${href}"><img width="16em" height="16em" flex-shrink="0" border-radius="3.2em"
                                    object-fit=cover src="${img}" alt=""/></a>
                                <span text-align="left">
                                    <a font="1.4em Mynerve" href="${href}">${title}</a><br line-height="3em"/>
                                    ${preview}
                                </span>
                            </p>

                        ` : /*html*/`

                            <p display="flex" gap="1em" max-width="32em" align-items="center"
                                wide-margin-top="${i * 10}em">

                                <span text-align="right">
                                    <a font="1.4em Mynerve" href="${href}">${title}</a><br line-height="3em"/>
                                    ${preview}
                                </span>
                                <a href="${href}"><img width="16em" height="16em" flex-shrink="0" border-radius="3.2em"
                                    object-fit=cover src="${img}" alt=""/></a>
                            </p>

                        `).join('')}




                        <p position="relative" padding-bottom="6em" padding-left="4em"
                            wide-margin-top="${2 * 10}em" pointer-events="none">

                            ${[ [14, 0, 0, "photo/dzien-pi-2023/kwaternion-2.jpg"], 
                                [12, 0, 4, "photo/dzien-pi-2023/kwaternion-1.jpg"], 
                                [11, 6, 8, "photo/wpt-15-lecie/0.jpg"],
                            ].map(([r,x = 0,y = 0, img=""], i) => (x == 0 && y == 0) ? /*html*/`

                                <a href="/aktualności"><img width="${r}em" height="${r}em" flex-shrink="0" border-radius="${.1*<number>r}em"
                                    background-color="${Color.blue}" object-fit=cover 
                                    src="/${img}" alt=""/></a>

                            ` : /*html*/`

                                <a href="/aktualności"><img width="${r}em" height="${r}em" flex-shrink="0" border-radius="${.1*<number>r}em"
                                    background-color="${Color.blue}" object-fit=cover 
                                    position="absolute" left="${x}em" top="${y}em" z-index="-${i}" filter="contrast(${1 - i/5})"
                                    src="/${img}" alt=""/></a>

                            `).join('')}

                            <a display="none" font="1.2em Mynerve" href="aktualności">...&nbsp;czytaj więcej</a>
                        </p>

                    </nav>





                    <section padding="8em 0" max-width="198em" margin="auto"
                        widest-display="flex" widest-align-items="center" widest-flex-flow="row wrap">
                        <h2 font="2.4em Playfair, serif" margin-left="2em" widest-text-align="center">O Kole</h2>


                        ${[
                            `Koło naukowe Kwaternion to grupa studentów, którzy kochają matematykę i 
                            chcą rozwijać swoją pasję. Nasza skupia się na organizowaniu wykładów, 
                            seminariów, a także warsztatów i konkursów matematycznych 
                            dla młodszych uczniów. W ten sposób propagujemy naukę matematyki oraz 
                            zachęcają kolejne pokolenia do jej poznawania i odkrywania.`,

                            `Członkowie koła uczestniczą również w konferencjach naukowych, gdzie 
                            dzielą się swoimi wynikami i doświadczeniami z innymi naukowcami. 
                            W ten sposób poszerzają swoją wiedzę i zdobywają nowe umiejętności, 
                            które mogą wykorzystać później w swojej pracy badawczej.`,

                            `Jednym z celów Koła Naukowego Kwaternion jest również tworzenie 
                            społeczności osób, które interesują się matematyką. 
                            Dzięki temu, studenci mają możliwość wymiany pomysłów, a także 
                            poznawania nowych ludzi, którzy dzielą ich pasję.`
                        ].map((content, i) => /*html*/`

                            <p background-color="${Color.blue}" color="${Color.black}" 
                                max-width="48em" padding="2em" padding-left="20vw" margin="2.4em 0"
                                widest-padding="2em" widest-margin="2.4em auto">
                                ${content}
                            </p>

                        `).join('')}


                        <address padding="1em" widest-width="100%" widest-font-size="180%">

                            <p font="1.2em Mynerve" max-width="32em" margin="5em auto" text-align="center">
                                <b font-size="120%">Dołącz do nas!</b><br/><br line-height="3em"/>

                                Jeśli interesujesz się matematyką, Koło Naukowe Kwaternion będzie 
                                dla Ciebie idealne. Skontaktuj się z nami aby dowiedzieć się 
                                więcej o działalności
                            </p>



                            <p font="1.2em Mynerve" id="kontakt" width="24em" margin="auto">
                                <b>Kontakt:</b><br/>
                                <a font-size="150%" href="mailto:a. Kuczmaczewska@.pollub.pl" display="inline-block" margin-left="10%">
                                    a. Kuczmaczewska@.pollub.pl
                                </a><br/>
                                <button font="120% Mynerve" display="inline-block" margin="1em" margin-left="75%"
                                    onclick="navigator.clipboard.writeText('a. Kuczmaczewska@.pollub.pl')">
                                    skopiuj
                                </button>
                            </p>

                        </address>

                    </section>






                    <footer background-color="${Color.black}" color="${Color.white}" width="calc(100% - 10em)"
                        padding="5em">

                        <ul list-style="none">

                            <li margin="1em 0"><a href="https://pollub.pl/">
                                <img width="12em" src="/pl-politechnika.png"/>
                            </a></li>
                            <li margin="1em 0"><a href="https://pollub.pl/">
                                <img width="12em" src="/wpt-pl-politechnika.png"/>
                            </a></li>

                        </ul>

                        <p margin-top="3.2em" opacity=".6">Wykonanie: Adam Jakubczak</p>

                    </footer>


                </article>

            </body>
        </html>

    `; modelWebsite() { return new DOMParser().parseFromString(this.website, "text/html") as Document }

    writeNews(folder: string, text: { title: string, href: string, content: string }) {

        const document = this.modelWebsite()
        const
            article = document.querySelector("article") as Element,
            header = document.querySelector("article > header") as Element,
            footer = document.querySelector("article > footer") as Element

        const titleMeta = document.head.querySelector("title") as Element
                titleMeta.innerText = text.title

        const dir = folder + "/" + text.href
        try { Deno.mkdirSync(dir) } catch(e) {}

        article.innerHTML = header.outerHTML + "<main>" + text.content + "</main>" + footer.outerHTML
        const html = "<!DOCTYPE html>" + document.head.outerHTML + document.body.outerHTML
            Deno.writeTextFileSync(dir + "/index.html", html)
    }

    /** handles all connections */
    async serve(port = 8000) {

        console.log(await getNetworkAddr() + ":8000");
        Deno.writeTextFile("static/index.html", this.website)

        try { Deno.mkdirSync("static") } catch(e) {}
        try { Deno.mkdirSync("static/news") } catch(e) {}
        for (const text of this.news)
            this.writeNews("static", text)

        for await (const conn of Deno.listen({ port }))
            this.handle(conn)
    }

    async handle(conn: Deno.Conn) {

        for await (const { respondWith, request } of Deno.serveHttp(conn))
            respondWith(this.handlePath(new URL(request.url).pathname)), console.info(request.url, request.method)
    }

    async handlePath(path: string, ext = path.slice(path.lastIndexOf("."))) {

        try {

            await Deno.stat("./static/" + path)
            return new Response(await Deno.readFile("./static/" + path), { 
                headers: <HeadersInit> { "content-type":  contentType(ext) }
            })

        } catch (error) {

            try {

                await Deno.stat("./static/" + path + "/index.html")
                return new Response(await Deno.readFile("./static/" + path + "/index.html"), { 
                    headers: <HeadersInit> { "content-type":  contentType(ext) }
                })

            } catch (error) { return new Response(null, { status: 404 }) }
        }
    }

} () .serve(8001)