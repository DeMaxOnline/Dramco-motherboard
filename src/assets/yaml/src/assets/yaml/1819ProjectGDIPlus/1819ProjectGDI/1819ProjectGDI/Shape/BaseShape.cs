using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _1819ProjectGDI.Shape
{
    [System.ComponentModel.TypeDescriptionProvider(typeof(AbstractControlDescriptionProvider<BaseShape, UserControl>))]
    public abstract class BaseShape : UserControl
    {
        private Contour contour = new Contour() { weight = 1, color = Color.Black, indent = Indents.full };
        private System.Windows.Forms.Panel drawPanel;

        public Contour Contour
        {
            get { return contour; }
            set { contour = value; }
        }

        private Fill fill = new Fill() { Color = Color.White};
        public Fill Fill
        {
            get { return this.fill; }
            set { fill = value; }
        }

        public BorderRadius BorderRadius { get; set; } = new BorderRadius() { BottemLeft = 0, BottemRight = 0, TopRight = 0, TopLeft = 0 };

        public BaseShape()
        {
            DoubleBuffered = true;
            InitializeComponent();
        }

        protected abstract void DrawContour(PaintEventArgs e);
        protected abstract void DrawFill(PaintEventArgs e);
        protected abstract GraphicsPath CreatePath();
        private void InitializeComponent()
        {
            this.drawPanel = new System.Windows.Forms.Panel();
            this.SuspendLayout();
            // 
            // drawPanel
            // 
            this.drawPanel.Location = new System.Drawing.Point(0, 0);
            this.drawPanel.Name = "drawPanel";
            this.drawPanel.Size = new System.Drawing.Size(150, 150);
            this.drawPanel.TabIndex = 0;
            // 
            // BaseShape
            // 
            this.Controls.Add(this.drawPanel);
            this.Name = "BaseShape";
            this.ResumeLayout(false);

        }
    }
}
