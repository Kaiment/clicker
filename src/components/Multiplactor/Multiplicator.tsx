import React, { Component } from 'react';
import './multiplicator.css';
import '../Work/producer.css'
import '../../App.css';

interface IState {
  price: number,
}

interface IProps {
  key: number,
  id: number,
  neuron_count: number,
  mult_count: number,
  name: string,
  price: number,
  add_multiplicator: any,
}

export default class Multiplicator extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.AddMultiplicator = this.AddMultiplicator.bind(this)
  }

  public readonly state: Readonly<IState> = {
    price: this.props.price,
  }

  private AddMultiplicator() {
    const { price } = this.state;
    const { id, neuron_count } = this.props;
    if (neuron_count >= price) {
      this.props.add_multiplicator(id, price);
      this.setState(state => ({
        price: Math.ceil(price * 12.2)
      }))
    }
  }

  public render() {
    const { price } = this.state;
    const { name, neuron_count } = this.props;
    return (
      <div onClick={ this.AddMultiplicator } className={ neuron_count >= price ? 'available producer' : 'unavailable producer'}>
        <div className='noselect'>{ name } multiplicator </div>
        <div className='noselect'>price: { price }</div>
      </div>
    )
  }
}