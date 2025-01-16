const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier');
const chokidar = require('chokidar');
const glob = require('glob');

const COMPONENTS_DIR = 'components';

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

function findAllHtmlFiles() {
    // Find all HTML files in the root and subdirectories, excluding the components directory
    return glob.sync('**/*.html', {
        ignore: ['node_modules/**', 'dist/**', 'components/**'],
        nodir: true
    });
}

function buildPages() {
    const components = loadComponents();
    const htmlFiles = findAllHtmlFiles();
    
    htmlFiles.forEach(file => {
        try {
            const template = fs.readFileSync(file, 'utf8');
            const processed = processTemplate(template, components);
            
            // Create dist directory and any necessary subdirectories
            const distPath = path.join('dist', path.dirname(file));
            if (!fs.existsSync(distPath)) {
                fs.mkdirSync(distPath, { recursive: true });
            }
            
            fs.writeFileSync(path.join('dist', file), processed);
            console.log(`Built ${file}`);
        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    });
}

// Watch mode
if (process.argv.includes('--watch')) {
    console.log('Watching for changes...');
    
    // Initial build
    buildPages();
    
    // Watch all HTML files and components
    const watcher = chokidar.watch(['**/*.html', '!node_modules/**', '!dist/**'], {
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