using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Drawing;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using _1819ProjectGDI.Shape;
using System.Drawing.Drawing2D;

namespace _1819ProjectGDI.Shapes
{
    public partial class Circle : BaseShape
    {
        protected override GraphicsPath CreatePath()
        {
            GraphicsPath path = new GraphicsPath();
            path.StartFigure();
            path.AddEllipse(this.Location.X + this.Width / 2, this.Location.Y - this.Height / 2, this.Width - Contour.weight, this.Width - Contour.weight);
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

        protected override void OnPaint(PaintEventArgs e)
        {
            DrawContour(e);
            DrawFill(e);
        }

        
    }
}
