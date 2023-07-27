const { log } = console
class Simulation {
  constructor(width, height, bgcolor, borderSize, borderColor) {
    this.canvas = document.getElementById('cvs')
    this.ctx = this.canvas.getContext('2d')
    this.canvas.style.border = `${borderSize} solid ${borderColor}`
    this.CW = this.canvas.width = width
    this.CH = this.canvas.height = height
    this.canvas.style.background = bgcolor
  }
  createCircula(
    circulaInterval,
    intervalSpeed,
    circulaColor,
    lineWidth,
    circulaRadius,
    textColor,
    lineColor,
  ) {
    const { ctx, CW, CH } = this
    let i = 0
    this.bitImgBackup = false
    this.bitImgLineBackup = false
    let loop = setInterval(() => {
      if (i >= Math.PI * 2) clearInterval(loop)
      let x = Math.cos(i) * circulaRadius + CW / 2
      let y = Math.sin(i) * circulaRadius + CH / 2

      // saving the bitimg
      if (this.bitImgBackup) ctx.putImageData(this.bitImgBackup, 0, 0)

      // creating circula
      ctx.beginPath()
      ctx.strokeStyle = circulaColor
      ctx.strokeRect(x, y, 1, 1)
      ctx.closePath()

      // using the saved bitimg
      this.bitImgBackup = ctx.getImageData(0, 0, CW, CH)

      // creating lines for cos value
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(x, y)
      ctx.closePath()

      // positioning the below text
      ctx.translate(x - 20, -30)

      // adding text props.
      ctx.fillStyle = textColor
      ctx.lineWidth = lineWidth
      ctx.font = '15px sans-serif'
      ctx.strokeStyle = lineColor

      // creating text and updating
      ctx.fillText(`cos(${x.toFixed(4)})`, 0, y)
      ctx.stroke()

      // Reset the transformation to avoid affecting other drawings
      ctx.setTransform(1, 0, 0, 1, 0, 0)

      // creating lines for sin value
      ctx.beginPath()
      ctx.moveTo(0, CH / 2)
      ctx.lineTo(x, y)
      ctx.closePath()

      // positioning the below text
      ctx.translate(-120, y + 20)

      // adding text props.
      ctx.fillStyle = textColor
      ctx.lineWidth = lineWidth
      ctx.font = '15px sans-serif'
      ctx.strokeStyle = lineColor

      // creating text and updating
      ctx.fillText(`sin(${y.toFixed(4)})`, x, 0)
      ctx.stroke()

      // Reset the transformation to avoid affecting other drawings
      ctx.setTransform(1, 0, 0, 1, 0, 0)

      i += circulaInterval
    }, intervalSpeed)
  }
}

const s = new Simulation(400, 400, 'grey', '3px', 'white')
s.createCircula(0.01, 10, 'yellow', 3, 100, 'white', 'red')
