import React, { useState, useEffect } from 'react';
import { component, connect, FormCreate, withRouter } from 'acore';
import { Input, Button, Radio, Row, Col, Space } from 'antd';
import styles from './Searches.less';
import QueueAnim from 'rc-queue-anim';
import { SearchOutlined, DeliveredProcedureOutlined } from '@ant-design/icons';
const { TextArea } = Input;
let lastRequestId = null;
// const onSearch = value => console.log(value);
const Searches = props => {
  const { theProjectInfo, SetChoosedMenu } = props;
  const [data, setData] = useState([]);
  const [textvalue, setTextValue] = useState([]);
  const [flag, setFlag] = useState(false);
  const [orClicked, setOrClick] = useState(true);
  const [andClicked, setAndClick] = useState(false);
  const [clearClicked, setClearClicked] = useState(false);
  const [currentOperate, setCurrentOperate] = useState("OR");

  const inputRef = React.createRef();
  useEffect(() => {
    if (theProjectInfo && theProjectInfo.searches) {
      setTextValue(theProjectInfo.searches)
    }
  }, [theProjectInfo]);
  const judge = (tempText, currText, value, repValue) => {
    // console.log("=========>", tempText, currText, value, repValue)
    let text = tempText
    if (tempText.length > 0) {
      if (tempText.slice(tempText.length - value.length - 1) === `${value} `) {
        if (currText === value) {
          text = tempText;
        } else {
          text = tempText + currText;
        }
      } else if (tempText.slice(tempText.length - repValue.length - 1) === `${repValue} `) {
        text = tempText.slice(0, tempText.length - repValue.length - 1) + `${value} `
      } else {
        text = currText === value ? tempText + ` ${value} ` : tempText + ` ${value} ` + currText;
      }
    } else {
      text = currText + ' ';
    }
    return text
  }

  const genRecommendKeywords = (searches) => {
    if (lastRequestId !== null) {
      clearTimeout(lastRequestId);
    }
    lastRequestId = setTimeout(() => {
      let payload = {
        searches,
        need_tips: true,
        conferences: [],
      };
      props.dispatch({
        type: 'trend/genStaticResultBySearches',
        payload,
      }).then(data => {
        if (data.items) {
          const extendValues = [];
          data.items.map(item => {
            if (item.term && extendValues.indexOf(item.term) == -1 && textvalue.indexOf(item.term) == -1) {
              extendValues.push(item.term);
            }
          });
          setData(extendValues);
          setFlag(true)
        }
      });
    }, 400);
  }
  // 文本框内容更新
  const onButtonChange = (e, target) => {
    let tempText = textvalue;
    // console.log("=========>", e, e.target.value)
    let currText = e.target.value;
    // if (e.type === 'click'||target) {
    if (currText == "OR") {
      const value = 'OR';
      const repValue = 'AND';
      tempText = judge(tempText, currText, value, repValue);
    } else if (currText == "AND") {
      const value = 'AND';
      const repValue = 'OR';
      tempText = judge(tempText, currText, value, repValue);
    } else if (clearClicked) {
      tempText = '';
      setOrClick(true);
      setAndClick(false);
      setClearClicked(false);
    }
    setTextValue(tempText)
    // } 

    // // 获取焦点
    // genRecommendKeywords(text)
    inputRef.current.focus();
  };

  const onTextChange = (e, target) => {
    setTextValue(e.target.value)
    genRecommendKeywords(e.target.value)
  };

  const onTagChange = (e) => {
    let tempText = textvalue;
    // console.log("=========>", e.target.value)
    let currText = e.target.value;
    let text = ""
    if (orClicked) {
      const value = 'OR';
      const repValue = 'AND';
      text = judge(tempText, currText, value, repValue);
    } else if (andClicked) {
      const value = 'AND';
      const repValue = 'OR';
      text = judge(tempText, currText, value, repValue);
    } else if (clearClicked) {
      text = '';
      setOrClick(true);
      setAndClick(false);
      setClearClicked(false);
    }
    setTextValue(text)
    // // 获取焦点
    // genRecommendKeywords(text)
    inputRef.current.focus();
  };

  // 点击按钮更新
  const onClick = (e) => {

    onButtonChange(e);
  }

  // 搜索回调
  const onSearchClick = () => {
    setFlag(false);
    sessionStorage.setItem('currsearches',textvalue)
    console.log("textvalue",textvalue)
    props.setCurrentSearches(textvalue)
  }

  // 更换下方关键词
  const onChangeBottomText = () => {
    const newData = data.slice(20).concat(...data.slice(0, 20))
    setData(newData);
  }

  const operateChange = (e) => {
    setOrClick(e.target.value == "OR")
    setAndClick(e.target.value == "AND")
    setClearClicked(e.target.value == "CLEAR")
    setCurrentOperate(e.target.value == "CLEAR" ? "OR" : e.target.value)
    onButtonChange(e, e.target.value)
  }
  return (
    <div className={ styles.mySearchComponent }>
      <Row>
        <Col span={ 20 } >
          <TextArea
            className={ styles.searchInput }
            placeholder="请输入关键词或检索式"
            autoSize={ { minRows: 1, maxRows: 6 } }
            onChange={ onTextChange }
            // defaultValue={this.props.initSearches||"??"}
            value={ textvalue }
            ref={ inputRef }
          /></Col>
        <Col span={ 4 } style={ { paddingLeft: "10px", display: "flex", justifyContent: "space-between" } }>
          <Button type="default" icon={ <SearchOutlined style={{fontSize:"16px"}} /> } onClick={ onSearchClick }></Button>
          <Button type="default" icon={ <DeliveredProcedureOutlined style={{fontSize:"16px"}}/> } onClick={ () => { SetChoosedMenu(["2"]) } }></Button>
          <Button type="text" onClick={ () => { SetChoosedMenu(["2"]) } } style={ { paddingLeft: "0px",fontSize:"16px",color:"#2f3b70" } } >智能分析</Button>

        </Col>
      </Row>
      <QueueAnim type="bottom">
        { flag && <Row key="recommend" style={ { zIndex: 100, position: "absolute" } }>
          <Col span={ 20 } className={ styles.recommend } >
            <div style={ { justifyContent: "space-between", display: "flex" } }>
              <span style={ { fontSize: 18 } }>推荐关键词：</span>
              <div className={ styles.orAnd }>
                <Radio.Group value={ currentOperate } size="small" onChange={ operateChange }>
                  <Radio value="OR">OR</Radio>
                  <Radio value="AND">AND</Radio>
                  {/* <Radio.Button value="CLEAR">Clear</Radio.Button> */ }
                </Radio.Group>
              </div>
            </div>
            <div className={ styles.changeKeyWords }>
              <div className={ styles.keyWords }>
                { data && data.map((item, index) => {
                  if (index > 18) {
                    return
                  }
                  return <Input
                    className={ styles.keyWord }
                    key={ index }
                    type='button'
                    value={ item }
                    onClick={ onTagChange }
                  />
                }) }
              </div>
              <div className={ styles.changeButton }>
                <Button type="text" onClick={ () => { setTextValue("") } }>
                  <span className={ styles.changeButtonText }>clear</span>
                </Button>
                <Button type="default" onClick={ onChangeBottomText }>
                  <span className={ styles.changeButtonText }>换一批</span>
                </Button>
              </div>
            </div>
          </Col>
        </Row> }
        { !flag && <div className={ styles.searchres }>共搜索到“<span className={ styles.highlight }>{ props.currentTotal.toLocaleString('en-US') || 0 }</span>”条数据信息</div> }
      </QueueAnim>

    </div>
  )
}
export default component(
  connect(({ }) => ({

  })),
)(Searches);
