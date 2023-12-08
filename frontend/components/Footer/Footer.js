const Footer = () => {
    const footerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#001233',
        color: '#FF595A',
        height: '4rem',
        flexGrow: '0',
        flexShrink: '0'
    }
    return (
        <footer style={footerStyle}>
            &copy; {new Date().getFullYear()} BetWave All rights reserved.
        </footer>
    );
}

export default Footer;