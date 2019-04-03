import React, { Component } from 'react';
import './work.css'

interface IState {
  price: number,
}

interface IProps {
  neuron_count: number,
  work_count: number,
  add_work: any,
}

export default class Work extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.addWork = this.addWork.bind(this);
  }

  public readonly state: Readonly<IState> = {
    price: 2,
  }

  private addWork() {
    const { price } = this.state;
    if (this.props.neuron_count >= this.state.price) {
      this.props.add_work(price);
      this.setState(state => ({
        price: Math.ceil(state.price * 1.1),
      }))
    }
  }

  public render() {
    const { price } = this.state;
    return (
      <div onClick={this.addWork}>
        <div>Work</div>
        <div>price: { price }</div>
        <div>count: { this.props.work_count }</div>
      </div>
    )
  }
}