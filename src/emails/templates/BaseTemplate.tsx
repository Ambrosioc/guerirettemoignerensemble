import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from '@react-email/components';
import { ReactNode } from 'react';

interface BaseTemplateProps {
    preview: string;
    children: ReactNode;
}

export default function BaseTemplate({ preview, children }: BaseTemplateProps) {
    return (
        <Html>
            <Head />
            <Preview>{preview}</Preview>
            <Body style={main}>
                <Container style={container}>
                    {/* Header avec logo */}
                    <Section style={header}>
                        <Img
                            src="https://guerirettemoignerensemble.fr/logo.png"
                            width="60"
                            height="60"
                            alt="Guérir & Témoigner Ensemble"
                            style={logo}
                        />
                        <Heading style={headerTitle}>
                            Guérir & Témoigner Ensemble
                        </Heading>
                    </Section>

                    {/* Contenu principal */}
                    <Section style={content}>
                        {children}
                    </Section>

                    {/* Footer */}
                    <Section style={footer}>
                        <Text style={footerText}>
                            © {new Date().getFullYear()} Merveille Grâce LUTETE - Guérir & Témoigner Ensemble
                        </Text>
                        <Text style={footerText}>
                            <Link href="https://guerirettemoignerensemble.fr" style={link}>
                                Visitez notre site web
                            </Link>
                            {' | '}
                            <Link href="mailto:merveillegrace-helene@outlook.com" style={link}>
                                Nous contacter
                            </Link>
                        </Text>
                    </Section>
                </Container>
            </Body>
        </Html>
    );
}

// Styles
const main = {
    backgroundColor: '#faf7f2',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
    margin: '0 auto',
    padding: '20px 0 48px',
    maxWidth: '600px',
};

const header = {
    textAlign: 'center' as const,
    padding: '20px 0',
    borderBottom: '1px solid #e5e5e5',
    marginBottom: '30px',
};

const logo = {
    margin: '0 auto 10px',
    borderRadius: '50%',
};

const headerTitle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#d4af37',
    margin: '0',
};

const content = {
    padding: '0 20px',
};

const footer = {
    textAlign: 'center' as const,
    padding: '30px 20px 0',
    borderTop: '1px solid #e5e5e5',
    marginTop: '40px',
};

const footerText = {
    fontSize: '12px',
    color: '#666666',
    margin: '5px 0',
};

const link = {
    color: '#d4af37',
    textDecoration: 'none',
};