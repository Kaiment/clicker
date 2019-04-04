import React, { Component } from 'react';
import './multiplicator.css';
import '../Work/producer.css'
import '../../App.css';

interface IProps {
  key: number,
  id: number,
  name: string,
  price: number,
  neuron_count: number,
  add_multiplicator: any,
}

export default class Multiplicator extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.AddMultiplicator = this.AddMultiplicator.bind(this)
  }

  private AddMultiplicator() {
    const { add_multiplicator, neuron_count, price, id } = this.props;
    if (neuron_count >= price) {
      add_multiplicator(id)
    }
  }

  public render() {
    const { price, name, neuron_count } = this.props;
    return (
      <div onClick={ this.AddMultiplicator } className={ neuron_count >= price ? 'available producer' : 'unavailable producer'}>
        <div className='noselect'>{ name } multiplicator </div>
        <div className='noselect'>price: { price }</div>
      </div>
    )
  }
}