import React, { Component } from 'react';
import { Input, Button } from 'antd';
import './index.less';

const { TextArea } = Input;
// const onSearch = value => console.log(value);
export default class index extends Component {
    state = {
        // list 来更新文本框，data来存储后端数据
        data: ['王冰冰', '周杰伦', 'Jay', '令狐冲', '王冰冰', '周杰伦', 'Jay', '令狐冲',
            '王冰冰', '周杰伦', 'Jay', '令狐冲', '王冰冰', '周杰伦', 'Jay', '令狐冲',
            '王冰冰', '周杰伦', 'Jay', '令狐冲', '王冰冰', '周杰伦', 'Jay', '令狐冲',
            '王冰冰', '周杰伦', 'Jay', '令狐冲', '王冰冰', '周杰伦', 'Jay', '令狐冲'],
        flag: false,
        orClicked: true,
        andClicked: false,
        clearClicked: false,
    };
    text = '';
    inputRef = React.createRef();

    judge = (tempText, currText, value, repValue) => {
        if (tempText.length > 0) {
            if (tempText.slice(tempText.length - value.length - 1) === `${value} `) {
                if (currText === value) {
                    this.text = tempText;
                } else {
                    this.text = tempText + currText;
                }
            } else if (tempText.slice(tempText.length - repValue.length - 1) === `${repValue} `) {
                this.text = tempText.slice(0, tempText.length - repValue.length - 1) + `${value} `
            } else {
                this.text = currText === value ? tempText + ` ${value} ` : tempText + ` ${value} ` + currText;
            }
        } else {
            this.text = currText + ' ';
        }
    }

    // 文本框内容更新
    onChange = (e) => {
        let tempText = this.text;
        let currText = e.target.value;
        if (e.type === 'click') {
            if (this.state.orClicked) {
                const value = 'OR';
                const repValue = 'AND';
                this.judge(tempText, currText, value, repValue);
            } else if (this.state.andClicked) {
                const value = 'AND';
                const repValue = 'OR';
                this.judge(tempText, currText, value, repValue);
            } else if (this.state.clearClicked) {
                this.text = '';
                this.setState({
                    orClicked: true,
                    andClicked: false,
                    clearClicked: false,
                });
            }
            this.setState({
                value: this.text
            })
        } else {
            this.setState({
                value: currText
            });
            this.text = currText;
        }
        // 获取焦点
        this.inputRef.current.focus();
    };

    // 点击按钮更新
    onClick = (e) => {
        this.onChange(e);
    }

    // 搜索回调
    onSearchClick = () => {
        console.log(this.text);
    }

    // 更换下方关键词
    onChangeBottomText = () => {
        const data = ['王冰冰', '周杰伦', 'Jay', '令狐冲', '王冰冰', '周杰伦', 'Jay', '令狐冲',
            '王冰冰', '周杰伦', 'Jay', '令狐冲', '王冰冰', '周杰伦', 'Jay', '令狐冲',
            '王冰冰', '周杰伦', 'Jay', '令狐冲', '王冰冰', '周杰伦', 'Jay', '令狐冲',
            '王冰冰', '周杰伦', 'Jay', '令狐冲', '王冰冰', '周杰伦', 'Jay', '令狐冲'];
        const newData = ['孙燕姿', '周深', '梁静茹', '孙燕姿', '周深', '梁静茹',
            '孙燕姿', '周深', '梁静茹', 'component', 'article', 'Typescript', 'JavaScript',
            'react-dom', 'onSearchClick', 'onChangeButton', 'getElementById', 'onClick'];
        this.setState({
            data: this.state.flag ? data : newData,
            flag: !this.state.flag
        });
    }

    addOr = (e) => {
        this.setState({
            orClicked: true,
            andClicked: false,
            clearClicked: false,
        }, function () {
            this.onChange(e);
        });
    }

    addAnd = (e) => {
        this.setState({
            orClicked: false,
            andClicked: true,
            clearClicked: false,
        }, function () {
            this.onChange(e);
        });
    }

    addClear = (e) => {
        this.setState({
            orClicked: false,
            andClicked: false,
            clearClicked: true,
        }, function () {
            this.onChange(e)
        });
    }

    render() {
        const { data } = this.state;

        const items = [];
        for (let i = 0; i < data.length; i++) {
            items.push(<Input
                className='keyWord'
                key={i}
                type='button'
                value={data[i]}
                onClick={this.onClick}
            />)
        };
        return (
            <>
                <TextArea
                    id='textArea'
                    placeholder="Autosize height based on content lines"
                    autoSize={{ minRows: 1, maxRows: 6 }}
                    onChange={this.onChange}
                    value={this.text}
                    ref={this.inputRef}
                />
                <Button type="primary" onClick={this.onSearchClick}>Search</Button>
                <div className='orAnd'>
                    {/* ant-click-animating-without-extra-node 是button点击的效果 */}
                    <Input className={['or', this.state.orClicked ? 'addColor' : null].join(' ')} type='button' value='OR' onClick={this.addOr} />
                    <Input className={['and', this.state.andClicked ? 'addColor' : null].join(' ')} type='button' value='AND' onClick={this.addAnd} />
                    <Input className='clear' type='button' value='CLEAR' onClick={this.addClear} />
                </div>
                <div className='changeKeyWords'>
                    <div className='keyWords'>
                        {items}
                    </div>
                    <div className='changeButton'>
                        <Button type="primary" onClick={this.onChangeBottomText}>
                            <span className='changeButtonText'>换一批</span>
                        </Button>
                    </div>
                </div>
            </>
        )
    }
}