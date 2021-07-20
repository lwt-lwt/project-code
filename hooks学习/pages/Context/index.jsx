import React, { useState, useContext } from 'react'

const themes = {
    light: {
        foreground: '#000000',
        background: '#eeeeee'
    },
    dark: {
        foreground: '#ffffff',
        background: '#222222'
    }
}


export default function Context() {
    const [theme, setTheme] = useState(themes.light);

    // provider表示提供者，由其来提供context，在这ThemeContext.Provider之下的左右组件都能拿到context
    return (
        <ThemeContext.Provider
            value={{
                theme,
                toggle: () => {
                    setTheme(theme => {
                        setTheme(theme === themes.light ? themes.dark : themes.light);
                    });
                }
            }}>
            <Toolbar />
        </ThemeContext.Provider>
    )
}

// 创建context
const ThemeContext = React.createContext({
    theme: themes.light,
    toggle: () => { }
})

const Toolbar = () => {
    return <ThemedButton />
}
const ThemedButton = () => {
    // 找到用的是哪个上下文
    const context = useContext(ThemeContext);
    return (
        <button
            style={{
                fontSize: '32px',
                color: context.theme.foreground,
                backgroundColor: context.theme.background
            }}
            onClick={() => {
                context.toggle();
            }}
        >
            Click Me!
        </button>
    )
}