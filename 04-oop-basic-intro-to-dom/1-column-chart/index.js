export default class ColumnChart {
  constructor({
    data = [],
    label = '',
    value = 0,
    link = '',
    formatHeading = data => data
  } = {}) {
    this.data = data,
    this.label = label,
    this.value = value,
    this.link = link,
    this.formatHeading = formatHeading

    this.render()
  }

  chartHeight = 50

  getTemplate() {
    return `
      <div class="column-chart" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.getLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.getColumnTitle()}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.getColumns(this.data)}
          </div>
        </div>
      </div>
    `
  }

  getLink() {
    return this.link ? `<a href=${this.link} class="column-chart__link">View all</a>` : ''
  }

  getColumnTitle() {
    return this.formatHeading(this.value)
  }

  getColumns(data) {
    const maxValue = Math.max(...this.data)
    const scale = this.chartHeight / maxValue

    return data.map(item => {
      const percent = (item / maxValue * 100).toFixed(0) + '%'

      return `<div style="--value: ${Math.floor(item * scale)}" data-tooltip=${percent}></div>`
    }).join('')

  }

  render() {
    const element = document.createElement('div')
    element.innerHTML = this.getTemplate()
    this.element = element.firstElementChild

    if (this.data.length === 0) {
      element.querySelector(".column-chart").classList.add("column-chart_loading")
    }
  }

  remove() {
    if (this.element) {
      this.element.remove()
    }
  }

  update() {
    this.render()
  }


  destroy() {
    this.remove()
  }

}
