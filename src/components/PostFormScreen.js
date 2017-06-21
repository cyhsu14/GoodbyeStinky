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
import {createPost, input, inputDanger,listPosts} from '../states/post-actions';
import {setToast} from '../states/toast';
// import {addStorage} from '../api/posts.js';
import DatePicker from 'react-native-datepicker';
import PushNotification from 'react-native-push-notification';
// import {addStorage} from '../states/store-actions';

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
        // id: PropTypes.number.isRequired,
        navigation: PropTypes.object.isRequired,
        name: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        isRefrige: PropTypes.bool.isRequired,
        // toast: PropTypes.string.isRequired,
        dispatch: PropTypes.func.isRequired
    };
    constructor(props){
        super(props);

        // this.inputFoodNameEl = this.props.name;
        this.inputQuantityEL = null;
        this.inputNoteEl = null;
        this.state = {
            ...PostFormScreen.getInitFoodInfoState(props),
            name: props.name,
            quantityToggle: false,
            unitToggle: false,
            inputFoodNameDanger: false,
            inputQuantityDanger: false
            // ,
            // inputUnitDanger: false
        };
        // console.log(this.state);
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
        return unit === '個' ? '個' : unit;
    }
    static getInitFoodInfoState(props) {
        return {
            name: props.name,
            quantity: 1,
            unit: '個',
            isSetDeadline: false,
            isAlarm: false,
            deadline: moment().format("YYYY-MM-DD"),
            alarmTime: moment().format("YYYY-MM-DD hh:mm a"),
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


    render() {
        const {inputFoodNameDanger,inputFoodNameEl,inputNoteEl,inputQuantityDanger} = this.state;
        const {name,quantity} = this.state;
        const category = this.props.category;

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
                            <Input placeholder={this.props.name} value={inputFoodNameEl}
                            onChange={this.handleFoodNameChange}/>
                        </Item>
                        <View style={{flexDirection: 'column'}}>
                            <Item style={{flex:1}} error={inputQuantityDanger}>
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
                             format="YYYY-MM-DD HH:mm a"
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
        // this.props.dispatch(listPosts(this.props.isRefrige));
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
          isSetDeadline: true
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
        // console.log(this.state);
        // console.log(this.state.deadline);
        if (!this.state.name) {
            this.setState({inputFoodNameDanger: true});
            return;
        }
        if(this.state.quantity<=0){ //!inputQuantityDanger
            // console.log('u');
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
        const {dispatch} = this.props;
        const {goBack} = this.props.navigation;
        // let da
        const foodDetail = {
            isRefrige: this.props.isRefrige,
            name:this.state.name,
            category:this.props.category,
            quantity:this.state.quantity,
            unit:this.state.unit,
            isSetDeadline:this.state.isSetDeadline,
            deadline:this.state.deadline,
            isAlarm:this.state.isAlarm,
            alarmTime:this.state.alarmTime,
            text:this.state.text
        }
        let d = new Date(Date.now());

        dispatch(createPost(foodDetail)).then(()=>{
            dispatch(listPosts(foodDetail.isRefrige));
            dispatch(setToast('Created.'));
            if(foodDetail.isAlarm){
                d = moment(foodDetail.alarmTime, 'YYYY-MM-DD HH:mm a').toDate();
                PushNotification.localNotificationSchedule({
                  message: `你的${foodDetail.name}過期啦！`,
                  date: d//new Date(Date.now() + (5 * 1000))  // in 60 secs
                });
            }
            else if(foodDetail.isSetDeadline){
                d = moment(foodDetail.deadline, 'YYYY-MM-DD HH:mm a').toDate();
                PushNotification.localNotificationSchedule({
                  message: `你的${foodDetail.name}過期啦！`,
                  date: d//new Date(Date.now() + (5 * 1000))  // in 60 secs
                });
            }
        });
        goBack();

    }
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
