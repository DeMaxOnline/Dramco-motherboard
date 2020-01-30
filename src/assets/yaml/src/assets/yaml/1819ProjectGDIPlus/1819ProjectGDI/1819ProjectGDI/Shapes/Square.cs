using _1819ProjectGDI.Shape;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _1819ProjectGDI.Shapes
{
    public partial class Square : BaseShape
    {
        protected override GraphicsPath CreatePath()
        {
            GraphicsPath path = new GraphicsPath();
            path.StartFigure();
            path.AddRectangle(new System.Drawing.RectangleF(this.Location.X + this.Contour.weight,this.Location.Y - this.Contour.weight, this.Width - 2*this.Contour.weight, this.Height - 2*this.Contour.weight));
            return path;
        }

        protected override void DrawContour(PaintEventArgs e)
        {
            using (Pen pen = new Pen(Contour.color, Contour.weight))
            {
                e.Graphics.DrawPath(pen, CreatePath());
            }
        }

        protected override void DrawFill(PaintEventArgs e)
        {
            using (SolidBrush brush = new SolidBrush(Fill.Color))
            {
                e.Graphics.FillPath(brush, CreatePath());
            }
        }
    }
}
