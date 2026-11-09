// @ts-check
import {defineConfig} from 'astro/config'
import {createHash} from 'node:crypto'
import {themeScript} from './src/lib/theme-script.mjs'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'
import {unified} from '@astrojs/markdown-remark'
import rehypeExpressiveCode from 'rehype-expressive-code'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeSlug from 'rehype-slug'
import {remarkCallouts} from './src/plugins/remark-callouts.ts'
import {remarkCodeGroups, rehypeCodeTabs} from './src/plugins/code-tabs.ts'
import {rehypeExternalLinks} from './src/plugins/rehype-external-links.ts'

const expressiveConfig = {
    themes: ['github-dark'],
    useDarkModeMediaQuery: false,
    defaultProps: {
        wrap: false,
    },
    styleOverrides: {
        borderRadius: 'var(--radius)',
        borderWidth: '1.5px',
        borderColor: 'var(--border)',
        codeBackground: 'var(--code-panel-bg)',
        codeForeground: '#e1e4e8',
        codeFontFamily: 'var(--font-jetbrains-mono)',
        codeFontSize: '0.8125rem',
        codeLineHeight: '1.7',
        codePaddingBlock: '1rem',
        codePaddingInline: '1.35rem',
        frames: {
            editorBackground: 'var(--code-panel-bg)',
            editorTabBarBackground: 'var(--code-panel-header)',
            editorTabBarBorderBottomColor: 'var(--border)',
            editorActiveTabBackground: 'var(--code-panel-bg)',
            editorActiveTabForeground: '#e1e4e8',
            editorActiveTabBorderColor: 'var(--accent)',
            editorActiveTabIndicatorTopColor: 'var(--accent)',
            editorActiveTabIndicatorHeight: '1.5px',
            editorTabBorderRadius: 'var(--radius)',
            terminalTitlebarBackground: 'var(--code-panel-header)',
            terminalTitlebarForeground: '#e1e4e8',
            terminalTitlebarDotsForeground: '#e1e4e8',
            terminalTitlebarDotsOpacity: '0.15',
            terminalTitlebarBorderBottomColor: 'var(--border)',
            terminalBackground: 'var(--code-panel-bg)',
            frameBoxShadowCssValue: 'none',
            inlineButtonForeground: '#e1e4e8',
            inlineButtonBackground: 'transparent',
            inlineButtonBackgroundIdleOpacity: '0',
            inlineButtonBackgroundHoverOrFocusOpacity: '0.1',
            inlineButtonBackgroundActiveOpacity: '0.18',
            inlineButtonBorder: '#e1e4e8',
            inlineButtonBorderOpacity: '0.3',
            tooltipSuccessBackground: 'var(--success)',
            tooltipSuccessForeground: '#0b1220',
        },
    },
}

const processor = unified({
    remarkPlugins: [remarkGfm, remarkMath, remarkCallouts, remarkCodeGroups],
    rehypePlugins: [
        rehypeSlug,
        rehypeExternalLinks,
        rehypeKatex,
        [rehypeExpressiveCode, expressiveConfig],
        rehypeCodeTabs,
    ],
})

export default defineConfig({
    // Content-Security-Policy: Astro hashes every inline script/style it renders and
    // emits the policy as a <meta> tag, so only this site's own code can run.
    // Add a domain here if you embed something new (e.g. YouTube -> frame-src).
    security: {
        csp: {
            directives: [
                "default-src 'self'",
                "img-src 'self' data: https://drive.google.com https://*.googleusercontent.com",
                "frame-src https://drive.google.com",
                "font-src 'self' data: https://fonts.gstatic.com",
                "media-src 'self'",
                "connect-src 'self'",
                "base-uri 'self'",
                "form-action 'self'",
                "object-src 'none'",
            ],
            scriptDirective: {
                hashes: [`sha256-${createHash('sha256').update(themeScript).digest('base64')}`],
            },
            styleDirective: {
                resources: ["'self'", "https://fonts.googleapis.com"],
            },
        },
    },
    integrations: [react()],
    vite: {
        plugins: [tailwindcss()],
    },
    markdown: {
        syntaxHighlight: false,
        processor,
    },
})