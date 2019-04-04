import React, { Component } from 'react';
import helpers from '../../helpers';
import './producer.css';
import '../../App.css';

interface IState {
  price: number,
  prod_value: number,
}

interface IProps {
  key: number,
  id: number,
  neuron_count: number,
  work_count: number,
  add_work: any,
  prod: number,
  price: number,
  name: string,
}

export default class Work extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.addWork = this.addWork.bind(this);
  }

  public readonly state: Readonly<IState> = {
    price: this.props.price,
    prod_value: 0,
  }

  private addWork() {
    const { price, prod_value } = this.state;
    const { prod, id } = this.props;
    if (this.props.neuron_count >= this.state.price) {
      this.setState(state => ({
        prod_value: state.prod_value + prod,
        price: Math.ceil(state.price * 1.2),
      }))
      this.props.add_work(id, price, prod_value);
    }
  }

  public render() {
    const { price } = this.state;
    const { neuron_count, name, prod } = this.props;
    return (
      <div onClick={this.addWork} className={ neuron_count >= price ? "available producer" : "unavailable producer"}>
        <div className='prod_name noselect'>{ name }</div>
        <div className='noselect'>price: { helpers.numberWithCommas(price) }, prod: { helpers.numberWithCommas(prod) } per second</div>
        <div className='noselect'>count: { helpers.numberWithCommas(this.props.work_count) }</div>
      </div>
    )
  }
}