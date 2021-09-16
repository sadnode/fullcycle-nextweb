import { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Button, Container, Grid, MenuItem, TextField, Typography } from "@material-ui/core";
import { useForm } from 'react-hook-form';

import { TransactionCategoryLabels, TransactionTypeLabels } from "../../utils/model";
import makeHttp from "../../utils/http";


const TransactionsNewPage: NextPage = () => {
    const router = useRouter();
    const { register, handleSubmit } = useForm();

    async function onSubmit(data: any) {
        try {
            await makeHttp().post('/transactions', data)
            router.push('/transactions')
        } catch (e) {
            console.error(e);
        }
    }
    
    return (
        <Container>
            <Typography component="h1" variant="h4">
                Nova Transação
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <TextField
                            type="date"
                            required
                            label="Data pagamento"
                            fullWidth
                            {...register('payment_date')}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            label="Nome"
                            required
                            fullWidth
                            {...register('name')}
                            inputProps={{ maxLength: 255 }}
                        />
                        <TextField
                            label="Descrição"
                            required
                            fullWidth
                            {...register('description')}
                        />
                        <TextField
                            select
                            required
                            label="Categoria"
                            {...register('category')}
                            fullWidth
                        >
                            {TransactionCategoryLabels.map((i, key) => (
                                <MenuItem key={key} value={i.value}>
                                {i.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            required
                            type="number"
                            label="Valor"
                            fullWidth
                            {...register('amount', { valueAsNumber: true })}
                        />
                        <TextField
                            select
                            required
                            label="Tipo de operação"
                            fullWidth
                            {...register('type')}
                        >
                            {TransactionTypeLabels.map((i, key) => (
                                <MenuItem key={key} value={i.value}>
                                {i.label}
                                </MenuItem>
                            ))}
                        </TextField>
                        <Box marginTop={1}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            
                            >
                                Salvar
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default TransactionsNewPage;
