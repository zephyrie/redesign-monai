const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier');
const chokidar = require('chokidar');

const COMPONENTS_DIR = 'components';
const HTML_FILES = [
    'index.html', 'core.html', 'docs.html', 'about.html', 
    'label.html', 'start.html', 'deploy.html', 'started.html',
    'community.html', 'model-zoo.html', 'mayo-case-study.html', '404.html',
    'wg/federated_learning.html'
];

const minifyOptions = {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
    minifyJS: true,
    minifyCSS: true
};

function replaceIncludes(content, components) {
    return content.replace(/<!-- #include file="\/components\/(.*?)" -->/g, (match, filename) => {
        return components[filename] || '';
    });
}

function processTemplate(template, components) {
    // Replace component includes
    let processed = replaceIncludes(template, components);
    
    // Minify in production
    if (process.env.NODE_ENV === 'production') {
        processed = minify(processed, minifyOptions);
    }
    
    return processed;
}

function loadComponents() {
    const components = {};
    fs.readdirSync(COMPONENTS_DIR).forEach(file => {
        const content = fs.readFileSync(path.join(COMPONENTS_DIR, file), 'utf8');
        components[file] = content;
    });
    return components;
}

function buildPages() {
    const components = loadComponents();
    
    HTML_FILES.forEach(file => {
        try {
            const template = fs.readFileSync(file, 'utf8');
            const processed = processTemplate(template, components);
            
            // Create dist directory if it doesn't exist
            if (!fs.existsSync('dist')) {
                fs.mkdirSync('dist');
            }
            
            fs.writeFileSync(path.join('dist', file), processed);
            console.log(`Built ${file}`);
        } catch (err) {
            if (err.code !== 'ENOENT') {
                console.error(`Error processing ${file}:`, err);
            }
        }
    });
}

// Watch mode
if (process.argv.includes('--watch')) {
    console.log('Watching for changes...');
    
    // Initial build
    buildPages();
    
    // Watch HTML files and components
    const watcher = chokidar.watch([...HTML_FILES, path.join(COMPONENTS_DIR, '*.html')], {
        persistent: true
    });
    
    watcher.on('change', (filepath) => {
        console.log(`File ${filepath} changed`);
        buildPages();
    });
} else {
    // Single build
    buildPages();
} 