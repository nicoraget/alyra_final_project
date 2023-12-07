const Footer = () => {
    const footerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: 'palegoldenrod',
        height: '4rem',
        flexGrow: '0',
        flexShrink: '0'
    }
    return (
        <footer style={footerStyle}>
            &copy; {new Date().getFullYear()}
        </footer>
    );
}

export default Footer;