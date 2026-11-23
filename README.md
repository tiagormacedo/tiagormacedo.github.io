# Academic webpages

This repository contains the source files for the academic webpages I maintain: my [personal website](https://tiagormacedo.github.io/) and two supporting websites for academic journals ([Communications in Mathematics](https://cm.episciences.org) and the [Journal of Non-Associative Structures](https://jonas.episciences.org)), for which I serve as Head Technical Editor. All three websites are simple, built entirely with HTML, CSS and JavaScript, and hosted on GitHub Pages.


## Repository structure

```text
├── assets/
│   ├── fonts/        # Source Sans 3 variable woff2 and OFL.txt
│   ├── images/       # pictures used in the website
│   ├── nojs.css      # used when JS is disabled
│   ├── script.js     # drawer, tab panels, scroll-spy, dynamic behavior
│   └── style.css     # website's visual styling and responsiveness
├── cim/              # Communications in Mathematics site
├── documents/        # PDFs linked from the sites
├── jonas/            # Journal of Non-Associative Structures site
├── .gitignore
├── .nojekyll         # disables Jekyll processing on GitHub Pages
├── 404.html          # GitHub Pages not-found page
├── LICENSE
├── index.html        # personal website
└── README.md
```


## Running locally

```bash
# clone this repository
git clone https://github.com/tiagormacedo/tiagormacedo.github.io.git

# change into the repository folder
cd tiagormacedo.github.io

# then serve it with one of these
python3 -m http.server 8000      # Python on Linux
python -m http.server 8000       # Python on Windows
npx serve -l 8000                # Node.js
php -S localhost:8000            # PHP
```

Then open <http://localhost:8000>. Opening `index.html` directly mostly works. But preloaded fonts are best served over HTTPS to avoid mixed‑content warnings and ensure consistent rendering.



## Technical details

- **Stack.** Plain HTML, CSS and JavaScript. No build step, no dependencies, and no frameworks.

- **Three sites.** GitHub Pages serves the whole repo from `main` / `(root)`: the personal page at the domain root, the journals at `/cim/` and `/jonas/`. Pushing to `main` is the deployment; `.nojekyll` skips Jekyll processing.

- **Editing the personal page.** Content: `index.html`, with one `<section>` for the introduction, one for research, one for teaching and one for service. Design: `assets/style.css`, where every proportion is derived from CSS custom properties defined in `:root`. Behavior: `assets/script.js`, with drawer, tabs, and scroll-spy handlers.

- **No-JS case.** For devices that cannot run JavaScript (e.g., low‑end hardware, printed output, or screen‑reader‑only environments), the nojs.css stylesheet is loaded via a `<noscript>` element, which reveals all tab panels.

- **Security.** Every HTML file carries a strict CSP (`default-src 'none'`). Any new external resource (analytics, CDN, widget) must be explicitly allowed there.

- **Accessibility.** ARIA tabs pattern, `inert`-based drawer focus management, and `prefers-reduced-motion` support.

- **Fonts.** [Source Sans 3](https://github.com/adobe-fonts/source-sans) (variable, weights 200–900) self‑hosted in `assets/fonts/`, with the SIL Open Font License (OFL.txt alongside the files).

- **Credits.** This layout based on [HTML5UP's "Prologue"](https://html5up.net/prologue) (CC BY 3.0); attribution retained in the footer.


## Contact

Best reached by email: tmacedo@unifesp.br.


## License

This repository is licensed under the [MIT license](LICENSE).
