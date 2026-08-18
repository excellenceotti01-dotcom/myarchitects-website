import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./MYArchitectsCharacterField.module.css";

const BRAND_WORD = "MYARCHITECTS";

const CLUSTER_THEMES = [
  ["ARCHITECT", "VISION", "CREATE", "MYARCHITECTS", "PLACE", "IDEA", "PURPOSE", "PEOPLE", "CULTURE", "REALITY", "EXTERIOR"],
  ["PROCESS", "DISCOVERY", "RESEARCH", "MYARCHITECTS", "STRATEGY", "SEQUENCE", "DEFINITION", "PLANNING", "DEVELOPMENT", "JOURNEY", "WORKING"],
  ["SPACE", "FORM", "LIGHT", "VOLUME", "MASS", "SCALE", "PROPORTION", "BALANCE", "RHYTHM", "MOTION", "PLACE"],
  ["MATERIAL", "TEXTURE", "STRUCTURE", "DETAIL", "CRAFT", "FRAME", "FOUNDATION", "FACADE", "INTERIOR", "MODEL", "PRECISION"],
  ["DESIGN", "CONCEPT", "CONTEXT", "GEOMETRY", "BALANCE", "RHYTHM", "PATTERN", "TYPOLOGY", "INNOVATION", "CREATIVITY"],
  ["PROJECT", "SITE", "PLAN", "MODEL", "BUILD", "CONSTRUCTION", "COLLABORATION", "ENGINEERING", "BLUEPRINT", "SKETCH"],
];

const MOBILE_THEMES = [
  ["DESIGN", "SPACE", "FORM", "LIGHT", "DETAIL", "CRAFT", "PLAN", "SITE"],
  ["BUILD", "MODEL", "SCALE", "FRAME", "MASS", "PLACE", "IDEA", "VISION"],
];

const getGridSize = (width, height) => {
  const isMobile = width < 700;
  return {
    columns: isMobile
      ? Math.max(13, Math.min(18, Math.round(width / 24)))
      : Math.max(30, Math.min(46, Math.round(width / 32))),
    rows: isMobile
      ? Math.max(18, Math.min(22, Math.round(height / 38)))
      : Math.max(24, Math.min(26, Math.round(height / 38))),
  };
};

const createEmptyGrid = (columns, rows) => Array.from({ length: rows }, () => Array.from(
  { length: columns },
  () => ({ letter: null, horizontalWordId: null, verticalWordId: null }),
));

const getWordCells = (word, direction, row, column) => word.split("").map((letter, index) => ({
  letter,
  row: row + (direction === "vertical" ? index : 0),
  column: column + (direction === "horizontal" ? index : 0),
}));

const isInsideGrid = (row, column, rows, columns) => row >= 0 && row < rows && column >= 0 && column < columns;

const getRuns = (cells, direction) => {
  const rows = cells.length;
  const columns = cells[0].length;
  const runs = [];
  const majorLength = direction === "horizontal" ? rows : columns;
  const minorLength = direction === "horizontal" ? columns : rows;

  for (let major = 0; major < majorLength; major += 1) {
    let minor = 0;
    while (minor < minorLength) {
      const getCell = (minorIndex) => direction === "horizontal" ? cells[major][minorIndex] : cells[minorIndex][major];
      if (!getCell(minor).letter) {
        minor += 1;
        continue;
      }
      const start = minor;
      let word = "";
      while (minor < minorLength && getCell(minor).letter) {
        word += getCell(minor).letter;
        minor += 1;
      }
      if (word.length > 1) {
        runs.push({ word, direction, row: direction === "horizontal" ? major : start, column: direction === "horizontal" ? start : major });
      }
    }
  }
  return runs;
};

const validateCrossword = (cells, placedWords) => {
  const registeredRuns = new Set(placedWords.map(({ word, direction, row, column }) => `${direction}:${row}:${column}:${word}`));
  const invalidHorizontal = getRuns(cells, "horizontal").filter(({ word, direction, row, column }) => !registeredRuns.has(`${direction}:${row}:${column}:${word}`));
  const invalidVertical = getRuns(cells, "vertical").filter(({ word, direction, row, column }) => !registeredRuns.has(`${direction}:${row}:${column}:${word}`));
  const unregisteredLetters = cells.flat().some((cell) => cell.letter && !cell.horizontalWordId && !cell.verticalWordId);
  return { valid: invalidHorizontal.length === 0 && invalidVertical.length === 0 && !unregisteredLetters, invalidHorizontal, invalidVertical };
};

const createBounds = (rowStart, rowEnd, columnStart, columnEnd) => ({ rowStart, rowEnd, columnStart, columnEnd });

const createClusters = (columns, rows) => {
  const midpoint = Math.floor(columns / 2);
  if (columns < 24) {
    const split = Math.floor(rows / 2);
    return [
      { id: "upper", bounds: createBounds(1, split - 2, 0, columns - 1), theme: MOBILE_THEMES[0], target: 6 },
      { id: "lower", bounds: createBounds(split + 2, rows - 2, 0, columns - 1), theme: MOBILE_THEMES[1], target: 6 },
    ];
  }
  const split = Math.floor(rows / 2);
  return [
    { id: "upper-left", bounds: createBounds(1, split - 2, 0, midpoint - 2), theme: CLUSTER_THEMES[0], target: 9 },
    { id: "upper-right", bounds: createBounds(1, split - 2, midpoint + 2, columns - 1), theme: CLUSTER_THEMES[1], target: 9 },
    { id: "lower-left", bounds: createBounds(split + 2, rows - 2, 0, midpoint - 2), theme: CLUSTER_THEMES[2], target: 9 },
    { id: "lower-right", bounds: createBounds(split + 2, rows - 2, midpoint + 2, columns - 1), theme: CLUSTER_THEMES[3], target: 9 },
  ];
};

const createCrossword = (columns, rows) => {
  const cells = createEmptyGrid(columns, rows);
  const placedWords = [];
  const wordClusters = new Map();
  const clusters = createClusters(columns, rows);

  const placeWord = (word, direction, row, column, clusterId, wordCells = getWordCells(word, direction, row, column)) => {
    const id = `${clusterId}-${direction}-${row}-${column}-${word}`;
    wordCells.forEach(({ letter, row: cellRow, column: cellColumn }) => {
      const cell = cells[cellRow][cellColumn];
      cell.letter = letter;
      cell[direction === "horizontal" ? "horizontalWordId" : "verticalWordId"] = id;
    });
    wordClusters.set(id, clusterId);
    placedWords.push({ id, word, direction, row, column, length: word.length, clusterId });
  };

  const getCandidatePlacements = (word, direction, cluster) => {
    const { bounds } = cluster;
    const maxRow = direction === "vertical" ? bounds.rowEnd - word.length + 1 : bounds.rowEnd;
    const maxColumn = direction === "horizontal" ? bounds.columnEnd - word.length + 1 : bounds.columnEnd;
    const candidates = [];
    for (let row = bounds.rowStart; row <= maxRow; row += 1) {
      for (let column = bounds.columnStart; column <= maxColumn; column += 1) {
        const wordCells = getWordCells(word, direction, row, column);
        const before = direction === "horizontal" ? { row, column: column - 1 } : { row: row - 1, column };
        const after = direction === "horizontal" ? { row, column: column + word.length } : { row: row + word.length, column };
        if ((isInsideGrid(before.row, before.column, rows, columns) && cells[before.row][before.column].letter)
          || (isInsideGrid(after.row, after.column, rows, columns) && cells[after.row][after.column].letter)) continue;

        let intersections = 0;
        let valid = true;
        for (const cell of wordCells) {
          const current = cells[cell.row][cell.column];
          const sameDirectionId = direction === "horizontal" ? current.horizontalWordId : current.verticalWordId;
          if (current.letter) {
            const crossingId = direction === "horizontal" ? current.verticalWordId : current.horizontalWordId;
            if (current.letter !== cell.letter || sameDirectionId || !crossingId || wordClusters.get(crossingId) !== cluster.id) {
              valid = false;
              break;
            }
            intersections += 1;
            continue;
          }
          const neighbours = direction === "horizontal"
            ? [{ row: cell.row - 1, column: cell.column }, { row: cell.row + 1, column: cell.column }]
            : [{ row: cell.row, column: cell.column - 1 }, { row: cell.row, column: cell.column + 1 }];
          if (neighbours.some(({ row: neighbourRow, column: neighbourColumn }) => (
            isInsideGrid(neighbourRow, neighbourColumn, rows, columns) && cells[neighbourRow][neighbourColumn].letter
          ))) {
            valid = false;
            break;
          }
        }
        if (!valid || intersections === 0) continue;
        const clusterWords = placedWords.filter(({ clusterId }) => clusterId === cluster.id);
        const horizontalCount = clusterWords.filter(({ direction: placedDirection }) => placedDirection === "horizontal").length;
        const verticalCount = clusterWords.length - horizontalCount;
        const balance = direction === "horizontal" ? verticalCount - horizontalCount : horizontalCount - verticalCount;
        const centerDistance = Math.abs(row - (bounds.rowStart + bounds.rowEnd) / 2) + Math.abs(column - (bounds.columnStart + bounds.columnEnd) / 2);
        candidates.push({ row, column, direction, wordCells, score: intersections * 100 + balance * 6 - centerDistance });
      }
    }
    return candidates;
  };

  clusters.forEach((cluster) => {
    const { bounds } = cluster;
    const anchorRow = Math.floor((bounds.rowStart + bounds.rowEnd) / 2);
    const anchorColumn = Math.floor((bounds.columnStart + bounds.columnEnd - BRAND_WORD.length + 1) / 2);
    if (anchorColumn >= bounds.columnStart && anchorColumn + BRAND_WORD.length - 1 <= bounds.columnEnd) {
      placeWord(BRAND_WORD, "horizontal", anchorRow, anchorColumn, cluster.id);
    }

    cluster.theme.some((word) => {
      if (placedWords.filter(({ clusterId }) => clusterId === cluster.id).length >= cluster.target) return true;
      const candidates = [
        ...getCandidatePlacements(word, "horizontal", cluster),
        ...getCandidatePlacements(word, "vertical", cluster),
      ].sort((a, b) => b.score - a.score || a.row - b.row || a.column - b.column);
      if (candidates[0]) {
        const { direction, row, column, wordCells } = candidates[0];
        placeWord(word, direction, row, column, cluster.id, wordCells);
      }
      return false;
    });
  });

  const validation = validateCrossword(cells, placedWords);
  const safeCells = validation.valid ? cells : createEmptyGrid(columns, rows);
  const safeWords = validation.valid ? placedWords : [];
  const memberships = safeCells.flat().map((cell) => [cell.horizontalWordId, cell.verticalWordId].filter(Boolean));
  return { characters: safeCells.flat().map(({ letter }) => letter || ""), memberships, placedWords: safeWords, clusters, validation };
};

const MYArchitectsCharacterField = ({ sectionRef, interactionExclusionRef = null }) => {
  const gridRef = useRef(null);
  const characterRefs = useRef([]);
  const pointerRef = useRef(null);
  const pulseRef = useRef(null);
  const frameRef = useRef(null);
  const geometryRef = useRef({ columns: 1, rows: 1, width: 1, height: 1, offsetX: 0, offsetY: 0 });
  const [reducedMotion, setReducedMotion] = useState(() => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [grid, setGrid] = useState({ columns: 24, rows: 20 });
  const crossword = useMemo(() => createCrossword(grid.columns, grid.rows), [grid.columns, grid.rows]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const measure = () => {
      const sectionRect = section.getBoundingClientRect();
      const nextGrid = getGridSize(sectionRect.width, sectionRect.height);
      const gridRect = gridRef.current?.getBoundingClientRect();
      geometryRef.current = { ...nextGrid, width: gridRect?.width || sectionRect.width, height: gridRect?.height || sectionRect.height, offsetX: (gridRect?.left || sectionRect.left) - sectionRect.left, offsetY: (gridRect?.top || sectionRect.top) - sectionRect.top };
      setGrid((current) => current.columns === nextGrid.columns && current.rows === nextGrid.rows ? current : nextGrid);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    const frame = requestAnimationFrame(measure);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [sectionRef, grid.columns, grid.rows]);

  useEffect(() => {
    if (reducedMotion) return undefined;
    const updateCharacters = () => {
      frameRef.current = null;
      const geometry = geometryRef.current;
      const pointer = pointerRef.current;
      const pulse = pulseRef.current;
      const now = performance.now();
      const pointerColumn = pointer ? Math.max(0, Math.min(geometry.columns - 1, Math.floor((pointer.x - geometry.offsetX) / (geometry.width / geometry.columns)))) : -1;
      const pointerRow = pointer ? Math.max(0, Math.min(geometry.rows - 1, Math.floor((pointer.y - geometry.offsetY) / (geometry.height / geometry.rows)))) : -1;
      const connectedWords = pointer ? crossword.memberships[pointerRow * geometry.columns + pointerColumn] : [];
      characterRefs.current.forEach((character, index) => {
        if (!character) return;
        const column = index % geometry.columns;
        const row = Math.floor(index / geometry.columns);
        const x = geometry.offsetX + ((column + 0.5) / geometry.columns) * geometry.width;
        const y = geometry.offsetY + ((row + 0.5) / geometry.rows) * geometry.height;
        const pointerDistance = pointer ? Math.hypot(pointer.x - x, pointer.y - y) : Infinity;
        const pointerStrength = Math.max(0, 1 - pointerDistance / Math.max(150, geometry.width * 0.17));
        const pulseAge = pulse ? now - pulse.time : Infinity;
        const pulseStrength = pulseAge < 850 ? Math.max(0, 1 - Math.hypot(pulse.x - x, pulse.y - y) / 130) * (1 - pulseAge / 850) : 0;
        const isConnected = connectedWords.some((wordId) => crossword.memberships[index].includes(wordId));
        const strength = Math.max(pointerStrength, pulseStrength, isConnected ? 0.2 : 0);
        character.style.setProperty("--character-alpha", (0.09 + strength * 0.8).toFixed(3));
        character.style.setProperty("--character-glow", (strength * 0.56).toFixed(3));
      });
      if (pulse && now - pulse.time >= 850) pulseRef.current = null;
      if (pulseRef.current) frameRef.current = requestAnimationFrame(updateCharacters);
    };
    const requestUpdate = () => { if (!frameRef.current) frameRef.current = requestAnimationFrame(updateCharacters); };
    const getLocalPoint = (event) => {
      const rect = sectionRef.current?.getBoundingClientRect();
      if (!rect || event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) return null;

      const exclusion = interactionExclusionRef?.current;
      if (exclusion) {
        const exclusionRect = exclusion.getBoundingClientRect();
        const padding = 32;
        const isExcluded = event.clientX >= exclusionRect.left - padding
          && event.clientX <= exclusionRect.right + padding
          && event.clientY >= exclusionRect.top - padding
          && event.clientY <= exclusionRect.bottom + padding;
        if (isExcluded) return null;
      }

      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const handlePointerMove = (event) => { pointerRef.current = getLocalPoint(event); requestUpdate(); };
    const handleClick = (event) => { const point = getLocalPoint(event); if (!point) return; pulseRef.current = { ...point, time: performance.now() }; requestUpdate(); };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("click", handleClick, { passive: true });
    requestUpdate();
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("click", handleClick);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [crossword, grid.columns, grid.rows, interactionExclusionRef, reducedMotion, sectionRef]);

  return (
    <div className={`${styles.field} ${reducedMotion ? styles.reducedMotion : ""}`} data-process-crossword aria-hidden="true">
      <div ref={gridRef} className={styles.grid} style={{ "--columns": grid.columns, "--rows": grid.rows }}>
        {crossword.characters.map((character, index) => (
          <span key={`${grid.columns}-${grid.rows}-${index}`} ref={(element) => { characterRefs.current[index] = element; }} className={styles.character}>
            {character}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MYArchitectsCharacterField;
