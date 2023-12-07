import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const Layout = ({children}) => {
    const layoutStyle = {
        display: 'flex',
        flexDirection: 'column',
    }

    const headerAndFooterStyle = {
        flexGrow: '0',
        flexShrink: '0',
    }

    const childrenStyle = {
        flexGrow: '1',
        margin: '0',
        padding: '0'
    }
    return (
        <div style={layoutStyle}>
            <Header style={headerAndFooterStyle}/>
            <main style={childrenStyle}>{children}</main>
            <Footer style={headerAndFooterStyle}/>
        </div>
    )
}
export default Layout