namespace _1819ProjectGDI
{
    partial class Main
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            _1819ProjectGDI.Shape.BorderRadius borderRadius2 = new _1819ProjectGDI.Shape.BorderRadius();
            _1819ProjectGDI.Shape.BorderRadius borderRadius3 = new _1819ProjectGDI.Shape.BorderRadius();
            this.circle1 = new _1819ProjectGDI.Shapes.Circle();
            this.circle2 = new _1819ProjectGDI.Shapes.Circle();
            this.SuspendLayout();
            // 
            // circle1
            // 
            this.circle1.BorderRadius = borderRadius2;
            this.circle1.Location = new System.Drawing.Point(234, 141);
            this.circle1.Name = "circle1";
            this.circle1.Size = new System.Drawing.Size(150, 150);
            this.circle1.TabIndex = 0;
            // 
            // circle2
            // 
            this.circle2.BorderRadius = borderRadius3;
            this.circle2.Location = new System.Drawing.Point(252, 157);
            this.circle2.Name = "circle2";
            this.circle2.Size = new System.Drawing.Size(150, 150);
            this.circle2.TabIndex = 1;
            // 
            // Main
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.circle2);
            this.Controls.Add(this.circle1);
            this.Name = "Main";
            this.Text = "Form1";
            this.ResumeLayout(false);

        }

        #endregion

        private Shapes.Circle circle1;
        private Shapes.Circle circle2;
    }
}

