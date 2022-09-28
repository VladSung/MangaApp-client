import {Avatar, Button, TextField, Grid, Box, Typography, Container,
  Link as MuiLink, Alert} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link} from 'react-router-dom'
import { useForm, SubmitHandler } from "react-hook-form";
import { gql, useMutation } from '@apollo/client';
import { AUTH } from 'src/graphql/queries/user';

interface FormInput {
    username: String;
    email: String;
    password: String;
}

const REGISTER_USER = gql`
    mutation registerUser($registerInput: RegisterInput!){
        registerUser(registerInput: $registerInput){
            username
            email
            id
        }
    }
`

export default function SignUp() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInput>({mode: 'onBlur'});

    const [registerUser, {loading, error}] = useMutation(REGISTER_USER, {
      update(cache, { data: { registerUser } }) {
        cache.modify({
          fields: {
            auth(){
              const auth = cache.writeQuery({
                query: AUTH,
                data: registerUser});
              return auth;
            }
          }
        });
      }
    });

    const onSubmit: SubmitHandler<FormInput> = data =>{
        registerUser({variables: {
          registerInput: {
            email: data.email,
          username: data.username,
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
            Регистрация
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
              {error && <Alert sx={{mt: 1}} severity="error">{error.message}</Alert>}
                <TextField
                  error={errors?.username && true}
                  helperText={errors?.username?.message}
                  required
                  fullWidth
                  label="Имя"
                  {...register("username", {
                    required: 'Поле обязательно к заполнению', 
                    minLength: {value: 2, message: 'Поле должно содержать минимум 2 значения'}})}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  error={errors?.email && true}
                  helperText={errors?.email?.message}
                  fullWidth
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
                  required
                  
                  error={errors?.password && true}
                  helperText={errors?.password?.message}
                  fullWidth
                  label="Пароль"
                  type="password"
                  autoComplete="new-password"
                  {...register("password", {required: 'Поле обязательно к заполнению'})}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>Регистрируясь вы соглашаетесь с правилами</Typography>
              </Grid>
            </Grid>
            <Button
            disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Зарегистрироваться
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item marginBottom={4}>
              <MuiLink component={Link} to="/login" variant="body2">
                  Уже есть аккаунт? Войти
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}