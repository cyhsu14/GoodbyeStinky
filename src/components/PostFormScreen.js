import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TextInput
} from 'react-native';

import {connect} from 'react-redux';
import {createPost, input, inputDanger} from '../states/post-actions';
import {setToast} from '../states/toast';
import {addStorage} from '../api/posts.js';
import DatePicker from 'react-native-datepicker'
// import {Form,
//   Separator,InputField, LinkField,
//   SwitchField, PickerField,DatePickerField,TimePickerField
// } from 'react-native-form-generator';
import { Container, Content, Header, Item, Icon, Input, InputGroup, Button,
    Picker, Label, ListItem, List, Right, Left, Switch, Body, Title} from 'native-base';
import moment from 'moment';
import appColors from '../styles/colors';
// import {setToast} from '../states/toast';
// import {getMoodIcon} from '../utilities/weather';

const now = moment().hour(0).minute(0);
class PostFormScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        category: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        isRefrige: PropTypes.bool.isRequired
    };
    constructor(props){
        super(props);
        console.log('props');
        console.log(props);
        this.inputFoodNameEl = this.props.name;
        this.inputQuantityEL = null;
        this.inputNoteEl = null;
        this.state = {
            ...PostFormScreen.getInitFoodInfoState(props),
            quantityToggle: false,
            unitToggle: false,
            inputFoodNameDanger: false,
            inputQuantityDanger: false,
            inputUnitDanger: false
        };

        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleFoodNameChange = this.handleFoodNameChange.bind(this);
        this.handleSetQuantity = this.handleSetQuantity.bind(this);
        this.handleUnit = this.handleUnit.bind(this);
        this.handleSetDeadline = this.handleSetDeadline.bind(this);
        this.handleDeadlineChange = this.handleDeadlineChange.bind(this);
        this.handleSetAlarmOn = this.handleSetAlarmOn.bind(this);
        this.handleAlarmTimeChange = this.handleAlarmTimeChange.bind(this);
        this.handleInputNoteChange = this.handleInputNoteChange.bind(this);
        // this.handleFoodInfodelete = this.handleFoodInfodelete.bind(this);
        this.handleFoodInfoSubmit = this.handleFoodInfoSubmit.bind(this);
    }
    static getUnitString(unit) {
        return unit === 'na' ? '單位' : unit;
    }
    static getInitFoodInfoState(props) {
        // console.log("propssss");
        // console.log(props);
        return {
            isRefrige: props.isRefrige,
            isEdit: false,
            category: props.category,
            name: props.name,
            id: NaN,
            quantity: 1,
            unit: 'na',
            isSetDeadline: false,
            isAlarm: false,
            deadline: moment(),
            alarmTime: moment(),
            text: ''
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            inputNameValue: nextProps.name,
            unit: nextProps.unit,
            deadline: moment()
        });
    }
    // constructor(props) {
    //     super(props);
    //
    //     this.handleGoBack = this.handleGoBack.bind(this);
    //     this.handleInputChange = this.handleInputChange.bind(this);
    //     this.handleCreatPost = this.handleCreatPost.bind(this);
    // }

    render() {
        // const {mood, inputValue, inputDanger} = this.props;
        // return (
        //     <Container>
        //         <Header>
        //             <Left><Button transparent
        //                 onPress={this.handleGoBack}>
        //                 <Icon name='arrow-left'  style={{fontSize: 24}} />
        //             </Button></Left>
        //             <Body><Title>New Post</Title></Body>
        //             <Right><Button transparent onPress={this.handleCreatPost}>
        //                 <Icon name='check'  style={{fontSize: 24}} />
        //             </Button></Right>
        //         </Header>
        //         <Content style={styles.content}>
        //             {getMoodIcon({
        //                 group: mood,
        //                 size: 120,
        //                 style: styles.mood
        //             })}
        //             <Item regular error={inputDanger} style={styles.item}>
        //                 {/* <Label>What's on your mind?</Label> */}
        //                 <Input autoFocus multiline maxLength={1024} placeholder="What's on your mind?"
        //                      style={styles.input} value={inputValue}
        //                      onChange={this.handleInputChange} />
        //             </Item>
        //         </Content>
        //     </Container>
        // );
        const {inputFoodNameDanger,inputFoodNameEl,inputNoteEl} = this.props;
        const {name,category,quantity} = this.state;

        return (
            <ScrollView keyboardShouldPersistTaps="always" style={{ height:200}}>
            <Container >
                <Header>
                    <Left><Button transparent
                        onPress={this.handleGoBack}>
                        <Icon name='chevron-left'  style={{fontSize: 24}} />
                    </Button></Left>
                    <Body><Title>新增食材</Title></Body>
                    <Right><Button transparent onPress={this.handleFoodInfoSubmit}>
                        <Icon name='check'  style={{fontSize: 24}} />
                    </Button></Right>
                </Header>
                <Content style={{paddingLeft:10, paddingRight:10}}>
                    <List>
                        <Item underlined error={inputFoodNameDanger} >
                            <Label>{category}類: </Label>
                            <Input placeholder={name} value={inputFoodNameEl}
                            onChange={this.handleFoodNameChange}/>
                        </Item>
                        <View style={{flexDirection: 'column'}}>
                            <Item style={{flex:1}}>
                                <Label>數量單位:</Label>
                                <Input ref='quantity' placeholder='1'
                                  keyboardType="numeric"
                                  onChange={this.handleSetQuantity}
                                />


                            <Picker
                                supportedOrientations={['portrait','landscape']}
                                iosHeader="Select one"
                                mode="dropdown"
                                selectedValue={this.state.unit}
                                onValueChange={this.handleUnit}
                                style={{flex:1}}>
                                <Picker.Item label="個" value="個" />
                                <Picker.Item label="人份" value="人份" />
                                <Picker.Item label="公克" value="公克" />
                                <Picker.Item label="公斤" value="公斤" />
                                <Picker.Item label="毫升" value="毫升" />
                                <Picker.Item label="公升" value="公升" />
                            </Picker>
                            </Item>
                        </View>
                        {/* <Label>有效期限</Label> */}
                        <ListItem icon style={{marginLeft:0}}>
                            <Left>
                                <Icon name="tag" style={{color: '#F78F59'}}/>
                            </Left>
                            <Body>
                              <Text>選擇有效期限</Text>
                            </Body>
                            <Right>
                                <Switch value={this.state.isSetDeadline} onValueChange={this.handleSetDeadline} />
                            </Right>
                        </ListItem>
                        <DatePicker
                           style={{width: 200}}
                           date={this.state.deadline}
                           mode="date"
                           format="YYYY-MM-DD"
                           minimumDate={now}
                           confirmBtnText="Confirm"
                           cancelBtnText="Cancel"
                           customStyles={{
                             dateIcon: {
                               position: 'absolute',
                               left: 0,
                               top: 4,
                               marginLeft: 0
                             },
                             dateInput: {
                               marginLeft: 36
                             }
                           }}
                           onDateChange={this.handleDeadlineChange}
                         />

                         <ListItem icon style={{marginLeft:0}}>
                             <Left>
                                 <Icon name="tag" style={{color: '#F78F59'}}/>
                             </Left>
                             <Body>
                               <Text>選擇提醒時間</Text>
                             </Body>
                             <Right>
                                 <Switch value={this.state.isAlarm} onValueChange={this.handleSetAlarmOn} />
                             </Right>
                         </ListItem>

                         <DatePicker
                             style={{width: 200}}
                             date={this.state.alarmTime}
                             mode="datetime"
                             format="YYYY-MM-DD HH:mm"
                             minimumDate={now}
                             confirmBtnText="Confirm"
                             cancelBtnText="Cancel"
                             customStyles={{
                               dateIcon: {
                                 position: 'absolute',
                                 left: 0,
                                 top: 4,
                                 marginLeft: 0
                               },
                               dateInput: {
                                 marginLeft: 36
                               }
                             }}
                             minuteInterval={10}
                             onDateChange={this.handleAlarmTimeChange}
                           />
                          <ListItem icon style={{marginLeft:0}}>
                              <Left>
                                  <Icon name="note" style={{color: '#F78F59'}}/>
                              </Left>
                              <Body>
                                <Label>備註：</Label>
                              </Body>

                          </ListItem>

                          <ListItem>
                              <Item>
                                   <Input multiline maxLength={1024} placeholder="有什麼想說的？"
                                        value={inputNoteEl}
                                        onChange={this.handleInputNoteChange}
                                        style={{height:100}}/>
                               </Item>
                           </ListItem>
                   </List>

                </Content>
            </Container>
         </ScrollView>);
    }
    handleGoBack() {
         this.props.navigation.goBack();
    }

    handleFoodNameChange(e){
        const inputFoodNameEl = e.nativeEvent.text;
        // console.log('i am ddsf');
        if(inputFoodNameEl===''||inputFoodNameEl.length>=9){
            this.setState({
                inputFoodNameDanger: true
            });
        }
        if(inputFoodNameEl && inputFoodNameEl.length<9){
            this.setState({
              name: inputFoodNameEl,
              inputFoodNameDanger: false
            });
        }
        // console.log("name:"+this.state.name);
    }
    handleSetQuantity(e){
        const numbers = e.nativeEvent.text;
        if(numbers<=0){
            this.setState({
                inputQuantityDanger: true
            });
        }
        this.setState({
            quantity: numbers,
            inputQuantityDanger: false
        });
            // console.log("Quantity" + this.state.quantity);

    }
    handleUnit(units){
        this.setState({
          unit: units
        });

    }
    handleSetDeadline(e){
        this.setState((prevState, props) => ({
            isSetDeadline: !prevState.isSetDeadline
        }));
    }
    handleDeadlineChange(date) {
        this.setState({
          deadline: date,
          isSetDeadline:true
        });
    // console.log("fuck");
    }
    handleSetAlarmOn(e){
        // console.log('AlarmOn');
        this.setState((prevState, props) => ({
            isAlarm: !prevState.isAlarm
        }));

    }

    handleAlarmTimeChange(time) {
        this.setState({
            alarmTime: time,
            isAlarm: true
        });
    }
    handleInputNoteChange(e){
        const texts = e.nativeEvent.text
        this.setState({
            text: texts
        });
    }
    handleFoodInfoSubmit(){
        if (!this.props.name) {
            this.setState({inputFoodNameDanger: true});
            return;
        }
        if(this.state.quantity<=0){
            this.setState({inputQuantityDanger: true});
            return;
        }
        if(this.state.unit === 'na'){
          this.setState({
              inputUnitDanger: true,
              unitToggle: true
          });
          return;
        }
            // console.log("this.state =");
            // console.log(this.state);
        const FoodDetail={
            id: this.props.id,
            name:this.state.name,
            category:this.props.category,
            quantity:this.state.quantity,
            unit:this.state.unit,
            isSetDeadline:this.state.isSetDeadline,
            deadline:this.state.deadline.format("YYYY-MM-DD"),
            isAlarm:this.state.isAlarm,
            alarmTime:this.state.alarmTime.format("YYYY-MM-DD hh:mm a"),
            text:this.state.text
        }

            // if(!this.props.isEdit){
            //     this.props.onPost(this.props.isRefrige,FoodDetail);
            // }
            // else{
            //     this.props.editfunc(this.props.isRefrige,FoodDetail);
            // }
    }

    // handleGoBack() {
    //      this.props.navigation.goBack();
    // }
    //
    // handleInputChange(e) {
    //     const {inputDanger: danger, dispatch} = this.props;
    //     const inputValue = e.nativeEvent.text;
    //     if (danger)
    //         dispatch(inputDanger(false));
    //     dispatch(input(inputValue));
    // }
    //
    // handleCreatPost() {
    //     const {mood, inputValue, dispatch} = this.props;
    //     const {goBack} = this.props.navigation;
    //
    //     //ours
    //
    //     if (inputValue) {
    //         const foodInfo={
    //             category: '',
    //             name: inputValue,
    //             quantity: 1,
    //             unit: 'na',
    //             isSetDeadline: false,
    //             deadline: "",
    //             isAlarm: false,
    //             alarmDate: "",
    //             alarmTime: "",
    //             text: '',
    //             isRefrige: false,        //need to be changed later
    //             isTimeOut: false
    //         }
    //         addStorage(foodInfo);
    //         console.log("addStorage");
    //         goBack();
    //     }
    //
    //     // teacher's
    //
    //     // if (inputValue) {
    //     //     dispatch(createPost(mood, inputValue)).then(() => {
    //     //         dispatch(setToast('Posted.'));
    //     //     });
    //     //     goBack();
    //     // } else {
    //     //     dispatch(inputDanger(true));
    //     // }
    // }
}

const styles = {
    content: {
        backgroundColor: appColors.primaryLight
    },
    mood: {
        color: appColors.primaryLightText,
        textAlign: 'center',
        marginTop: 32,
        marginBottom: 32,
    },
    item: {
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 4,
        backgroundColor: '#fff'
    },
    input: {
        height: 100
    }
};

export default connect(state => ({
    ...state.foodForm
}))(PostFormScreen);
