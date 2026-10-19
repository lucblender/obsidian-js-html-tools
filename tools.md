<div class="ev-loss-calculator" style="border:1px solid var(--background-modifier-border); border-radius:8px; padding:12px 14px; margin:12px 0;">
  <label>
    Focal length (mm):
    <input type="number" min="1" step="0.1" data-field="focal-length" value="50">
  </label>
  <br>
  <br>
  <label>
    Extension length (mm):
    <input type="number" min="0" step="0.1" data-field="extension-length" value="12">
  </label>
  <p>
    EV loss: <strong data-field="ev-output">0.00</strong> EV
  </p>
</div>

<div class="aov-calculator" style="border:1px solid var(--background-modifier-border); border-radius:8px; padding:12px 14px; margin:12px 0;">
  <label>
    Focal length (mm):
    <input type="number" min="1" step="0.1" data-field="focal-length" value="50">
  </label>
  <br>
  <br>
  <label>
    Film size:
    <select data-field="film-format">
      <option value="36x24">135 (36x24)</option>
      <option value="56x42">120 4.5x6 (~56x42)</option>
      <option value="56x56">120 6x6 (~56x56)</option>
      <option value="70x56">120 6x7 (~70x56)</option>
      <option value="84x56">120 6x9 (~84x56)</option>
    </select>
  </label>
  <p>
    Hor.: <strong data-field="aov-output-h">0.00</strong>°<br>
    Vert.: <strong data-field="aov-output-v">0.00</strong>°<br>
    Diag.: <strong data-field="aov-output-d">0.00</strong>°
  </p>
</div>

<div class="equiv-focal-calculator" style="border:1px solid var(--background-modifier-border); border-radius:8px; padding:12px 14px; margin:12px 0;">
  <label>
    Original focal length (mm):
    <input type="number" min="1" step="0.1" data-field="original-focal-length" value="50">
  </label>
  <br>
  <br>
  <label>
    Original film size:
    <select data-field="original-film-format">
      <option value="36x24">135 (36x24)</option>
      <option value="56x42">120 4.5x6 (~56x42)</option>
      <option value="56x56">120 6x6 (~56x56)</option>
      <option value="70x56">120 6x7 (~70x56)</option>
      <option value="84x56">120 6x9 (~84x56)</option>
    </select>
  </label>
  <br>
  <br>
  <label>
    Equivalent film size:
    <select data-field="equivalent-film-format">
      <option value="36x24">135 (36x24)</option>
      <option value="56x42">120 4.5x6 (~56x42)</option>
      <option value="56x56">120 6x6 (~56x56)</option>
      <option value="70x56">120 6x7 (~70x56)</option>
      <option value="84x56" selected>120 6x9 (~84x56)</option>
    </select>
  </label>
  <p>
    Equivalent focal length<br>
    Hor.: <strong data-field="equiv-focal-output-h">0.0</strong> mm<br>
    Vert.: <strong data-field="equiv-focal-output-v">0.0</strong> mm<br>
    Diag.: <strong data-field="equiv-focal-output-d">0.0</strong> mm
  </p>
</div>

<div class="focus-distance-calculator" style="border:1px solid var(--background-modifier-border); border-radius:8px; padding:12px 14px; margin:12px 0;">
  <label>
    Focal length (mm):
    <input type="number" min="1" step="0.1" data-field="focal-length" value="50">
  </label>
  <br>
  <br>
  <label>
    Focus distance without extension (mm):
    <input type="number" min="1" step="1" data-field="focus-distance" value="1000">
  </label>
  <br>
  <br>
  <label>
    Extension length (mm):
    <input type="number" min="0" step="0.1" data-field="extension-length" value="12">
  </label>
  <p>
    New focus distance: <strong data-field="focus-output-mm">0.0</strong> mm
    (<strong data-field="focus-output-m">0.000</strong> m)
  </p>
</div>

<div class="tele-aperture-calculator" style="border:1px solid var(--background-modifier-border); border-radius:8px; padding:12px 14px; margin:12px 0;">
  <label>
    Base aperture (f-number):
    <input type="number" min="0.1" step="0.1" data-field="base-fnumber" value="2.8">
  </label>
  <br>
  <br>
  <label>
    Teleconverter ratio (M):
    <input type="number" min="1" step="0.1" data-field="tele-ratio" value="2">
  </label>
  <p>
    Reduced aperture: <strong data-field="aperture-output">f/0.0</strong>
  </p>
</div>

<div class="tele-ev-loss-calculator" style="border:1px solid var(--background-modifier-border); border-radius:8px; padding:12px 14px; margin:12px 0;">
  <label>
    Teleconverter ratio (M):
    <input type="number" min="1" step="0.1" data-field="tele-ratio" value="2">
  </label>
  <p>
    EV loss: <strong data-field="tele-ev-output">0.00</strong> EV
  </p>
</div>

<div class="c41-timing-calculator" style="border:1px solid var(--background-modifier-border); border-radius:8px; padding:12px 14px; margin:12px 0;">
  <label>
    Number of rolls:
    <input type="number" min="1" step="1" data-field="roll-count" value="1">
  </label>
  <p>
    Default: <strong data-field="time-default">00:03:30</strong><br>
    Push +1: <strong data-field="time-push1">00:04:33</strong><br>
    Push +2: <strong data-field="time-push2">00:06:08</strong><br>
    Push +3: <strong data-field="time-push3">00:08:45</strong><br>
    Pull -1: <strong data-field="time-pull1">00:02:42</strong>
  </p>
</div>

<div class="id11-timing-calculator" style="border:1px solid var(--background-modifier-border); border-radius:8px; padding:12px 14px; margin:12px 0;">
  <label>
    Film:
    <select data-field="film"></select>
  </label>
  <br>
  <br>
  <label>
    ISO:
    <select data-field="iso"></select>
  </label>
  <br>
  <br>
  <label>
    Temperature (°C):
    <select data-field="temperature">
      <option value="24">24</option>
      <option value="23">23</option>
      <option value="22">22</option>
      <option value="21">21</option>
      <option value="20" selected>20</option>
      <option value="19">19</option>
      <option value="18">18</option>
      <option value="17">17</option>
      <option value="16">16</option>
    </select>
  </label>
  <br>
  <br>
  <label>
    Roll number:
    <input type="number" min="1" max="10" step="1" data-field="roll-number" value="1">
  </label>
  <p>
    Development time: <strong data-field="time-output">00:00:00</strong>
  </p>
</div>

<div class="eclipse-simulator" style="border:1px solid var(--background-modifier-border); border-radius:8px; padding:12px 14px; margin:12px 0;">
  <label>
    Focal length (mm):
    <input type="range" min="10" max="5000" step="1" value="500" data-field="focal-range">
    <input type="number" min="10" max="5000" step="1" value="500" data-field="focal-number" style="width:90px;">
  </label>
  <br>
  <br>
  <label>
    Film / sensor:
    <select data-field="format">
      <option value="135">135</option>
      <option value="120 6x4.5">120 6x4.5</option>
      <option value="120 6x6">120 6x6</option>
      <option value="120 6x7">120 6x7</option>
      <option value="120 6x9">120 6x9</option>
      <option value="APS-C">APS-C</option>
      <option value="Micro 4/3">Micro 4/3</option>
      <option value="1&quot;">1"</option>
    </select>
  </label>
  <br>
  <br>
  <label>
    Display zoom:
    <input type="range" min="2" max="40" step="0.5" value="10" data-field="zoom-range">
    <input type="number" min="2" max="40" step="0.5" value="10" data-field="zoom-number" style="width:90px;">
  </label>
  <p>
    Sensor: <strong data-field="sensor-size">-</strong><br>
    Projected sun: <strong data-field="sun-diameter">-</strong> mm<br>
    Horizontal FOV: <strong data-field="hfov">-</strong>°<br>
    Vertical FOV: <strong data-field="vfov">-</strong>°<br>
    Sun fills short side: <strong data-field="sun-fill">-</strong>%
  </p>
  <canvas data-field="canvas" width="900" height="700" style="width:100%; max-width:900px; border:1px solid var(--background-modifier-border); background:rgb(46,46,46);"></canvas>
</div>
