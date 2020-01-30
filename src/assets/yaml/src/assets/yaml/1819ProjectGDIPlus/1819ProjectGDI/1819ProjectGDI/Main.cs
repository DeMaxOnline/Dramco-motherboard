using _1819ProjectGDI.Shapes;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace _1819ProjectGDI
{
    public partial class Main : Form
    {
        public Main()
        {
            InitializeComponent();
            Circle c = new Circle();
            c.Location = new Point(300, 300);
            this.Controls.Add(c);
        }
    }
}
