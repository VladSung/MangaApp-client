import {Avatar, Button, TextField, Grid, Box, Checkbox, Typography, Container,
  Link as MuiLink, Alert} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm, SubmitHandler } from "react-hook-form";
import { gql, useMutation } from '@apollo/client';
import {Link} from 'react-router-dom'
import { AUTH } from 'src/graphql/queries/user';

interface FormInput {
    username: String;
    email: String;
    password: String;
}

const REGISTER_USER = gql`
    mutation loginUser($loginInput: LoginInput!){
        loginUser(loginInput: $loginInput){
            id
        }
    }
`

const Login = () =>  {
  
  const [loginUser, { loading, error}] = useMutation(REGISTER_USER, {
    refetchQueries: [
      {query: AUTH},
      'auth'
    ],
  });
  const { register, handleSubmit, formState: { errors } } = useForm<FormInput>({mode: 'onBlur'});
  
    const onSubmit: SubmitHandler<FormInput> = data =>{
      loginUser({variables: {
          loginInput: {
            email: data.email,
            password: data.password,
          
        }
        }});
    };

    return (
    <Container component="main" maxWidth="xs">
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Вход
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {error && <Alert severity="error">{error.message}</Alert>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                defaultValue='shutov.vladislav.2017@gmail.com'
                  required
                  fullWidth
                  error={errors?.email && true}
                  helperText={errors?.email?.message}
                  autoComplete="email"
                  label="Email адрес"
                  {...register("email", {
                    required: 'Поле обязательно к заполнению', 
                    pattern: {
                        value:  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Некорректный email адрес'
                    }
                })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  defaultValue='admin'
                  error={errors?.password && true}
                  helperText={errors?.password?.message}
                  required
                  fullWidth
                  label="Пароль"
                  type="password"
                  autoComplete="new-password"
                  {...register("password", {required: 'Поле обязательно к заполнению'})}
                />
              </Grid>
              <Grid sx={{display: 'inline-flex', alignItems: 'center'}} item xs={12}>
                <Checkbox checked disabled/>
                <Typography>я согласен с правилами</Typography>
              </Grid>
            </Grid>
            <Button
            disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Войти
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item marginBottom={4}>
                <MuiLink component={Link} to="/registration" variant="body2">
                Нет аккаунта? Зарегистрироваться
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
};

export default Login;