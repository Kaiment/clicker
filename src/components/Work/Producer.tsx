import React, { Component } from 'react';
import helpers from '../../helpers';
import './producer.css';
import '../../App.css';

interface IProps {
  key: number,
  id: number,
  name: string,
  price: number,
  prod: number,
  count: number,
  neuron_count: number,
  add_work: any,
}

export default class Work extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.addWork = this.addWork.bind(this);
  }

  private addWork() {
    const { add_work, id, neuron_count, price } = this.props;
    if (neuron_count >= price) {
      add_work(id);
    }
  }

  public render() {
     const { neuron_count, name, prod, price } = this.props;
    return (
      <div onClick={this.addWork} className={ neuron_count >= price ? "available producer" : "unavailable producer"}>
        <div className='prod_name noselect'>{ name }</div>
        <div className='noselect'>price: { helpers.numberWithCommas(price) }, prod: { helpers.numberWithCommas(prod) } per second</div>
        <div className='noselect'>count: { helpers.numberWithCommas(this.props.count) }</div>
      </div>
    )
  }
}