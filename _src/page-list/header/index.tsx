import { ToggleThemeButton } from '@/_src/features/theme';
import { Logo } from '@/_src/shared/ui/logo';
import { LoginButtonOrAvatar } from '@/_src/widgets/auth';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { AppBar, Badge, Box, Button, IconButton, Toolbar } from '@mui/material';
import Link from 'next/link';
import { StyledButton } from './Button';
import { PageProps } from '@/_src/shared/types';
import { useTranslation } from '@/_src/shared/lib/i18n';

export const Header = async ({ params }: PageProps) => {
    const { t } = await useTranslation(params.lng, 'header');
    return (
        <AppBar
            color="default"
            position="sticky"
            variant="elevation"
            sx={{
                justifyContent: 'center',
            }}
        >
            <Toolbar
                component="div"
                variant="dense"
                sx={{ minHeight: 55, gap: 1, containerType: 'inline-size' }}
            >
                <>
                    <Link href="/" aria-label={t('go-home')}>
                        <Logo aria-label="MangaHouse" sx={{ fontSize: 40, mr: 2 }} />
                    </Link>

                    <Box
                        sx={{
                            'flexGrow': 1,
                            'display': 'flex',
                            'gap': 3,
                            'alignItems': 'center',
                            'jc': 'center',
                            '@container (width < 700px)': {
                                display: 'none',
                            },
                        }}
                    >
                        <StyledButton href="/popular" exact color="inherit">
                            {t('popular')}
                        </StyledButton>
                        <StyledButton href="/ru/manga" exact color="inherit">
                            {t('catalog')}
                        </StyledButton>
                        <Button color="inherit">{t('search')}</Button>
                    </Box>
                    <Button
                        size="medium"
                        variant="contained"
                        href="/creator-dashboard"
                        component={Link}
                    >
                        {t('creator-dashboard')}
                    </Button>
                    <ToggleThemeButton />
                    <IconButton
                        sx={{ mr: 1 }}
                        size="small"
                        aria-label={t(`show ${17} new notification(s)`)}
                    >
                        <Badge badgeContent={17} color="secondary">
                            <NotificationsRoundedIcon />
                        </Badge>
                    </IconButton>
                    <div>
                        <LoginButtonOrAvatar params={params} />
                    </div>
                </>
            </Toolbar>
        </AppBar>
    );
};
