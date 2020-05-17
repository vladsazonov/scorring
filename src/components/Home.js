import React, {Component} from 'react';
import Typography from '@material-ui/core/Typography';
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    root: {
        flexGrow: 1,
        height: '100vh',
       // marginBottom: 30,
    },
    container: {
        // display: 'flex',
        // flexWrap: 'wrap',
    },
});

class Home extends React.Component {

    state = {
        salary: null,
        creditAmount: null,
        score: null,
        isAnswer: false,
        month: null,
        communalPayments: null,
        interestRate: 0.7,
        livingWage: 9657,
        additionalIncome: null,
        maxCredit: null,
        familyMembers: 1,
        bankSalary: null,
        creditPercent: 30,
        netIncome: null,
        otherIncome: null,
        solvency: null,
        drawAnswer: false,

        marriage: null,
        position: null,
        property: null,
        car: null,
        debt: null,
        education: null,
        citizenship: null,
        existingLoans: null,

    };

    handleChangeSalary = (event) => {
        this.setState({
            salary: event.target.value,
        })
    };
    handleChangeCreditAmount = (event) => {
        this.setState({
            creditAmount: event.target.value,
        })
    };
    handleChangeMonth = (event) => {
        this.setState({
            month: event.target.value,
        })
    };
    handleChangeCommunalPayments = (event) => {
        this.setState({
            communalPayments: event.target.value,
        })
    };
    handleChangeAdditionalIncome = (event) => {
        this.setState({
            additionalIncome: event.target.value,
        })
    };
    handleChangeFamilyMembers = (event) => {
        this.setState({
            familyMembers: event.target.value,
        })
    };

    calculate = () => {
        let NewLivingWage = +this.state.livingWage * +this.state.familyMembers;
        let NewNetIncome = +this.state.salary * 0.87 - +this.state.communalPayments -
            NewLivingWage + +this.state.additionalIncome;
        let NewSolvency = (NewNetIncome * 0.6) * +this.state.month;
        let NewMaxCredit;
        let scoreSumm = +this.state.marriage + +this.state.position + +this.state.property +
            +this.state.car +
            +this.state.debt + +this.state.education + +this.state.citizenship + +this.state.existingLoans;

        if (NewSolvency > 0) {
            NewMaxCredit = NewSolvency / (1 + (+this.state.month + 1) * +this.state.creditPercent / 2400);
            scoreSumm += 1;

        } else {
            NewMaxCredit = 0;
        }


        this.setState({
            netIncome: NewNetIncome,
            solvency: NewSolvency,
            livingWage: NewLivingWage,
            maxCredit: NewMaxCredit.toFixed(0),
            drawAnswer: true,
            score: scoreSumm
        });
    };

    handleChangeMarriage = (event) => {
        this.setState({
            marriage: event.target.value,
        })
    };
    handleChangePosition = (event) => {
        this.setState({
            position: event.target.value,
        })
    };
    handleChangeProperty = (event) => {
        this.setState({
            property: event.target.value,
        })
    };
    handleChangeCar = (event) => {
        this.setState({
            car: event.target.value,
        })
    };

    handleChangeDebt = (event) => {
        this.setState({
            debt: event.target.value,
        })
    };

    handleChangeEducation = (event) => {
        this.setState({
            education: event.target.value,
        })
    };

    handleChangeCitizenship = (event) => {
        this.setState({
            citizenship: event.target.value,
        })
    };

    handleChangeExistingLoans = (event) => {
        this.setState({
            existingLoans: event.target.value,
        })
    };


    render() {
        const {styles, theme, classes,} = this.props;
        const validCredit = this.state.score > 2.25 ? (
            <div>Скоринговый балл высокий. Выдача займа разрешена</div>
        ) : (
            <div>Скоринговый балл низкий. К выдаче займа клиенту отказано</div>
        );
        const credit = this.state.drawAnswer ? (
            this.state.maxCredit != null && this.state.maxCredit > 0 ? (
                +this.state.creditAmount > +this.state.maxCredit ? (
                    <div>Клиент не можете получить указанную сумму, максимальный разрешенный
                        займ: {this.state.maxCredit}руб {validCredit}</div>
                ) : (
                    <div>
                        Клиент может получить запрашиваемый займ. Максимальная сумма займа:
                        {this.state.maxCredit}руб {validCredit}
                    </div>
                )
            ) : (<div>Некорректные данные</div>)
        ) : (<div>Введите данные</div>);


        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.title}>
                            Vicly Scoring
                        </Typography>
                    </Toolbar>
                </AppBar>
                <form className={classes.container} noValidate autoComplete="off">
                    <div style={{display: 'flex', justifyContent: 'center', alignSelf: 'center'}}>
                        <div style={{width: '21%', borderRight: '1px solid #cecece', borderLeft: '1px solid #cecece',  marginTop: 20}}>

                            <div style={{marginRight: 30,  marginLeft: 30}}>
                                <Typography variant="h5">Личная информация клиента</Typography>
                                <TextField
                                    fullWidth
                                    required
                                    label="Зарплата"
                                    className={classes.textField}
                                    value={this.salary}
                                    onChange={this.handleChangeSalary}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Дополнительный доход"
                                    className={classes.textField}
                                    value={this.otherIncome}
                                    onChange={this.handleChangeAdditionalIncome}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Комунальные платежи за месяц"
                                    className={classes.textField}
                                    value={this.communalPayments}
                                    onChange={this.handleChangeCommunalPayments}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Количество членов семьи"
                                    className={classes.textField}
                                    value={this.familyMembers}
                                    onChange={this.handleChangeFamilyMembers}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Сумма займа"
                                    className={classes.textField}
                                    value={this.creditAmount}
                                    onChange={this.handleChangeCreditAmount}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Срок займа (мес)"
                                    className={classes.textField}
                                    value={this.month}
                                    onChange={this.handleChangeMonth}
                                    margin="normal"
                                    variant="outlined"
                                />
                            </div>
                        </div>

                        <div style={{
                            width: '26%',
                            textAlign: '-webkit-left',
                            borderRight: '1px solid #cecece',
                            marginTop: 20,
                            marginLeft: 50,
                        }}>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Состоит ли клиент в браке?</FormLabel>
                                <RadioGroup
                                    aria-label="Gender"
                                    name="gender1"
                                    className={classes.group}
                                    value={this.state.marriage}
                                    onChange={this.handleChangeMarriage}
                                >
                                    <FormControlLabel value="0.25" control={<Radio/>} label="Да"/>
                                    <FormControlLabel value="0" control={<Radio/>} label="Нет"/>
                                </RadioGroup>
                            </FormControl>

                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Занимает ли клиет высокую должность?</FormLabel>
                                <RadioGroup
                                    aria-label="Gender"
                                    name="gender1"
                                    className={classes.group}
                                    value={this.state.position}
                                    onChange={this.handleChangePosition}
                                >
                                    <FormControlLabel value="0.25" control={<Radio/>} label="Да"/>
                                    <FormControlLabel value="0" control={<Radio/>} label="Нет"/>
                                </RadioGroup>
                            </FormControl>

                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Имеется ли у клиента собственная недвижимость?</FormLabel>
                                <RadioGroup
                                    aria-label="Gender"
                                    name="gender1"
                                    className={classes.group}
                                    value={this.state.property}
                                    onChange={this.handleChangeProperty}
                                >
                                    <FormControlLabel value="0.25" control={<Radio/>} label="Да"/>
                                    <FormControlLabel value="0" control={<Radio/>} label="Нет"/>
                                </RadioGroup>
                            </FormControl>

                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Имеется ли у клиента автомобиль?</FormLabel>
                                <RadioGroup
                                    aria-label="Gender"
                                    name="gender1"
                                    className={classes.group}
                                    value={this.state.car}
                                    onChange={this.handleChangeCar}
                                >
                                    <FormControlLabel value="0.25" control={<Radio/>} label="Да"/>
                                    <FormControlLabel value="0" control={<Radio/>} label="Нет"/>
                                </RadioGroup>
                            </FormControl>

                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Имееются ли у клиента задолжности по кредитам?</FormLabel>
                                <RadioGroup
                                    aria-label="Gender"
                                    name="gender1"
                                    className={classes.group}
                                    value={this.state.debt}
                                    onChange={this.handleChangeDebt}
                                >
                                    <FormControlLabel value="0" control={<Radio/>} label="Да"/>
                                    <FormControlLabel value="0.25" control={<Radio/>} label="Нет"/>
                                </RadioGroup>
                            </FormControl>

                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Имеется ли у клиента высшее образование?</FormLabel>
                                <RadioGroup
                                    aria-label="Gender"
                                    name="gender1"
                                    className={classes.group}
                                    value={this.state.education}
                                    onChange={this.handleChangeEducation}
                                >
                                    <FormControlLabel value="0.25" control={<Radio/>} label="Да"/>
                                    <FormControlLabel value="0" control={<Radio/>} label="Нет"/>
                                </RadioGroup>
                            </FormControl>

                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Имеется ли у клиента гражданство РФ?</FormLabel>
                                <RadioGroup
                                    aria-label="Gender"
                                    name="gender1"
                                    className={classes.group}
                                    value={this.state.citizenship}
                                    onChange={this.handleChangeCitizenship}
                                >
                                    <FormControlLabel value="0.25" control={<Radio/>} label="Да"/>
                                    <FormControlLabel value="0" control={<Radio/>} label="Нет"/>
                                </RadioGroup>
                            </FormControl>

                            <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Имеется ли у клиента действующие кредиты?</FormLabel>
                                <RadioGroup
                                    aria-label="Gender"
                                    name="gender1"
                                    className={classes.group}
                                    value={this.state.existingLoans}
                                    onChange={this.handleChangeExistingLoans}
                                >
                                    <FormControlLabel value="0" control={<Radio/>} label="Да"/>
                                    <FormControlLabel value="0.25" control={<Radio/>} label="Нет"/>
                                </RadioGroup>
                            </FormControl>
                        </div>

                        <div style={{
                            width: '27%',
                            //textAlign: '-webkit-left',
                            // marginRight: 50,
                            borderRight: '1px solid #cecece',
                            marginTop: 20,
                            textAlign: 'center',
                        }}>
                            <Typography variant="body1">Коэффициент
                                платежеспособности: {this.state.solvency}</Typography><br/>
                            <Typography variant="body1">Процентная ставка: {this.state.creditPercent}%</Typography><br/>
                            <Typography variant="body1">Прожиточный минимум: {this.state.livingWage}р</Typography><br/>
                            <Typography variant="body1">Максимальная сумма кредита: {this.state.maxCredit}р</Typography><br/>
                            <Typography variant="body1">Скоринговый балл: {this.state.score}</Typography><br/>
                            <Typography variant="h6" style={{color: '#ef0511'}}> {credit} </Typography>
                            {/*       {validCredit}*/}
                            <Button style={{marginTop: 30}} type="button" onClick={this.calculate}
                                    variant="outlined">Рассчитать</Button>
                        </div>
                    </div>

                </form>


            </div>

        )
    };
}

export default withStyles(styles)(Home);