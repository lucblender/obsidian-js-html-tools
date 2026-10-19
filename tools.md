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
