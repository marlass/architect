module.exports = {
    pageUrl: '/',
    title: 'Architect',
    lang: 'pl',
    otherLangPage: '/home',
    content: [
        {
            sectionType: 'masthead',
            content: {
                background: '/static/img/about.jpg',
                title: 'O nas'
            }
        },
        {
            sectionType: 'text',
            content: {
                text: '<p>Architect to prężnie działająca pracownia projektowania wnętrz, która powstała na początku 2011r. Od ponad 5 lat z powodzeniem realizujemy projekty wnętrz na terenie Warszawy i okolic. W naszym dorobku mamy już ponad 100 projektów – zachęcamy do zapoznania się z naszym portfolio, które w jakimś stopniu pokaże Państwu nasze pomysły i możliwości. W naszej firmie stawiamy na rozwój - co roku uczestniczymy w największych imprezach branżowych, odwiedzamy największe targi wnętrzarskie w Paryżu i Mediolanie tak by być na bieżąco z najnowszymi trendami.</p><a href="/about">Poznaj nas</a>'
            }
        },
        {
            sectionType: 'masthead',
            content: {
                background: '/static/img/offer.jpg',
                title: 'Oferta'
            }
        },
        {
            sectionType: 'text',
            content: {
                text: '<ul><li><h3>Projekty aranżacji wnętrz</h3><p>W skład dokumentacji technicznej projektu wchodzą: rzuty funkcjonalne, rzuty sufitów i podłóg, schematy rozprowadzenia instalacji, charakterystyczne widoki ścian, detale architektoniczne dla wykonawcy, specyfikacje materiałów wykończeniowych.</p></li><li><h3>Kompleksowe projekty budynków</h3><p>Projekty domów jednorodzinnych i rezydencji, budynków wielorodzinnych, budynków użyteczności publicznej, w tym gastronomia, zakłady opieki zdrowotnej, biurowce, obiektów sportowych.</p></li><li><h3>Projekty przebudowy i modernizacji</h3><p>Zakres projektu przebudowy jest określany zgodnie z potrzebami inwestora oraz wymogami formalno-prawnymi. Zapewniam również obsługę w zakresie: inwentaryzacja wielobranżowa, ekspertyza budowlana stanu istniejącego, badania geotechniczne gruntu.</p></li><li><h3>Projekty urbanistyczne</h3><p>Koncepcja architektoniczna w cenie 1500zł brutto- domów jednorodzinnych lub obiektów usługowych o powierzchni do 200m2 (dla większych obiektów cena do uzgodnienia), w zakresie: opis i parametry techniczne, plan zagospodarowania, rzuty kondygnacji, przekrój, elewacje.</p></li></ul><a href="/offer">Zapoznaj się z naszą ofertą</a>'
            }
        },
        {
            sectionType: 'masthead',
            content: {
                background: '/static/img/projects/1-15.jpg',
                title: 'Realizacje'
            }
        },
        {
            sectionType: 'projectsBlock',
            content: {
                projects: [
                    {
                        big: true,
                        url: '/portfolio/fds',
                        img: '/static/img/projects/1-12.jpg',
                        title: 'Willa na wzgórzu'
                    },
                    {
                        big: false,
                        url: '/portfolio/fds',
                        img: '/static/img/projects/2.jpg',
                        title: 'Restauracja'
                    },
                    {
                        big: false,
                        url: '/portfolio/fds',
                        img: '/static/img/projects/3.jpg',
                        title: 'Siedziba korporacji'
                    },
                    {
                        big: true,
                        url: '/portfolio/fds',
                        img: '/static/img/projects/4.jpg',
                        title: 'Modernistyczny dom'
                    }
                ],
                more: {
                    link: '/realizacje',
                    title: 'Zobacz więcej projektów'
                }
            }
        },
        {
            sectionType: 'masthead',
            content: {
                background: '/static/img/contact.jpg',
                title: 'Kontakt'
            }
        },
        {
            sectionType: 'smallOffices',
            content: {
                contactUrl: '/kontakt',
                contactLinkTitle: 'Skontaktuj się z nami',
                offices: [
                    {
                        title: 'Siedziba',
                        street: 'pl. Bema 10',
                        city: 'Wrocław',
                        postal: '50-004',
                        phone: '123 456 789',
                        mail: 'contact@architect.com'
                    },
                    {
                        title: 'Biuro projektowe',
                        street: 'pl. Grunwaldzki 20',
                        city: 'Wrocław',
                        postal: '50-024',
                        phone: '123 456 788',
                        mail: 'office@architect.com'
                    }
                ]
            }
        }
    ]
}
