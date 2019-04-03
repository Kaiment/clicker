import React, { Component } from 'react';
import helpers from '../../helpers';
import './producer.css';
import '../../App.css';

interface IState {
  price: number,
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
  }

  private addWork() {
    const { price } = this.state;
    const { prod, id } = this.props;
    if (this.props.neuron_count >= this.state.price) {
      this.props.add_work(id, price, prod);
      this.setState(state => ({
        price: Math.ceil(state.price * 1.2),
      }))
    }
  }

  public render() {
    const { price } = this.state;
    const { neuron_count, name } = this.props;
    return (
      <div onClick={this.addWork} className={ neuron_count >= price ? "available producer" : "unavailable producer"}>
        <div className='prod_name noselect'>{ name }</div>
        <div className='noselect'>price: { helpers.numberWithCommas(price) }</div>
        <div className='noselect'>count: { helpers.numberWithCommas(this.props.work_count) }</div>
      </div>
    )
  }
}