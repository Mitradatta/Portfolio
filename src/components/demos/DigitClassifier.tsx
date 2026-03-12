import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import * as tf from '@tensorflow/tfjs';

interface Prediction {
    digit: number;
    confidence: number;
}

// Pre-trained model weights URL (hosted on GitHub/CDN)
const MODEL_URL = 'https://storage.googleapis.com/tfjs-models/tfjs/mnist_transfer_cnn_v1/model.json';

export const DigitClassifier: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [model, setModel] = useState<tf.LayersModel | null>(null);
    const [predictions, setPredictions] = useState<Prediction[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [topPrediction, setTopPrediction] = useState<Prediction | null>(null);

    // Initialize canvas and load model
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Set canvas background
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Load pre-trained model
        loadModel();
    }, []);

    const loadModel = async () => {
        try {
            setIsLoading(true);
            setLoadError(null);

            // Try to load pre-trained model from TensorFlow.js hosted models
            const loadedModel = await tf.loadLayersModel(MODEL_URL);
            setModel(loadedModel);
            setIsLoading(false);
        } catch (error) {
            console.error('Error loading hosted model, creating local model:', error);

            // Fallback: Create and train a simple model with synthetic data
            try {
                await createAndTrainModel();
            } catch (trainError) {
                console.error('Error training model:', trainError);
                setLoadError('Failed to load model. Please refresh the page.');
                setIsLoading(false);
            }
        }
    };

    const createAndTrainModel = async () => {
        // Create a simple model
        const model = tf.sequential();

        model.add(tf.layers.conv2d({
            inputShape: [28, 28, 1],
            kernelSize: 5,
            filters: 8,
            activation: 'relu',
            kernelInitializer: 'varianceScaling'
        }));
        model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));
        model.add(tf.layers.conv2d({
            kernelSize: 5,
            filters: 16,
            activation: 'relu',
            kernelInitializer: 'varianceScaling'
        }));
        model.add(tf.layers.maxPooling2d({ poolSize: 2, strides: 2 }));
        model.add(tf.layers.flatten());
        model.add(tf.layers.dense({
            units: 10,
            activation: 'softmax',
            kernelInitializer: 'varianceScaling'
        }));

        model.compile({
            optimizer: tf.train.adam(0.001),
            loss: 'categoricalCrossentropy',
            metrics: ['accuracy']
        });

        // Generate synthetic training data that mimics digit patterns
        const numSamples = 500;
        const trainData = generateSyntheticDigits(numSamples);

        // Train the model
        await model.fit(trainData.xs, trainData.ys, {
            epochs: 10,
            batchSize: 32,
            shuffle: true,
            callbacks: {
                onEpochEnd: (epoch, logs) => {
                    console.log(`Epoch ${epoch + 1}: loss = ${logs?.loss?.toFixed(4)}`);
                }
            }
        });

        // Cleanup training data
        trainData.xs.dispose();
        trainData.ys.dispose();

        setModel(model);
        setIsLoading(false);
    };

    // Generate synthetic digit-like patterns for training
    const generateSyntheticDigits = (numSamples: number) => {
        const images: number[][][] = [];
        const labels: number[] = [];

        for (let i = 0; i < numSamples; i++) {
            const digit = i % 10;
            const image = createDigitPattern(digit);
            images.push(image);
            labels.push(digit);
        }

        // Convert to tensors
        const xs = tf.tensor4d(
            images.flat(2),
            [numSamples, 28, 28, 1]
        );
        const ys = tf.oneHot(tf.tensor1d(labels, 'int32'), 10);

        return { xs, ys };
    };

    // Create a simple pattern for each digit
    const createDigitPattern = (digit: number): number[][] => {
        const image: number[][] = Array(28).fill(null).map(() => Array(28).fill(0));

        // Add some noise
        for (let y = 0; y < 28; y++) {
            for (let x = 0; x < 28; x++) {
                image[y][x] = Math.random() * 0.1;
            }
        }

        // Draw digit-specific patterns
        const cx = 14 + (Math.random() - 0.5) * 4;
        const cy = 14 + (Math.random() - 0.5) * 4;
        const scale = 0.8 + Math.random() * 0.4;

        switch (digit) {
            case 0: // Circle
                drawCircle(image, cx, cy, 8 * scale);
                break;
            case 1: // Vertical line
                drawLine(image, cx, cy - 10 * scale, cx, cy + 10 * scale, 2);
                break;
            case 2: // Two curves
                drawArc(image, cx, cy - 5, 6 * scale, 0, Math.PI);
                drawLine(image, cx - 6 * scale, cy + 8, cx + 6 * scale, cy + 8, 2);
                break;
            case 3: // Two arcs
                drawArc(image, cx, cy - 4, 5 * scale, -Math.PI/2, Math.PI/2);
                drawArc(image, cx, cy + 4, 5 * scale, -Math.PI/2, Math.PI/2);
                break;
            case 4: // L shape + vertical
                drawLine(image, cx - 5, cy - 10 * scale, cx - 5, cy, 2);
                drawLine(image, cx - 5, cy, cx + 5, cy, 2);
                drawLine(image, cx + 3, cy - 10 * scale, cx + 3, cy + 10 * scale, 2);
                break;
            case 5: // S-like
                drawLine(image, cx - 6, cy - 8, cx + 6, cy - 8, 2);
                drawLine(image, cx - 6, cy - 8, cx - 6, cy, 2);
                drawArc(image, cx, cy + 4, 6 * scale, 0, Math.PI);
                break;
            case 6: // Circle with top curve
                drawCircle(image, cx, cy + 3, 6 * scale);
                drawArc(image, cx - 2, cy - 5, 4 * scale, Math.PI, 2 * Math.PI);
                break;
            case 7: // Top line + diagonal
                drawLine(image, cx - 6, cy - 10, cx + 6, cy - 10, 2);
                drawLine(image, cx + 4, cy - 10, cx - 2, cy + 10, 2);
                break;
            case 8: // Two circles
                drawCircle(image, cx, cy - 5, 5 * scale);
                drawCircle(image, cx, cy + 5, 5 * scale);
                break;
            case 9: // Circle with bottom line
                drawCircle(image, cx, cy - 5, 6 * scale);
                drawLine(image, cx + 5, cy - 2, cx + 2, cy + 10, 2);
                break;
        }

        return image;
    };

    const drawCircle = (image: number[][], cx: number, cy: number, r: number) => {
        for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
            const x = Math.round(cx + r * Math.cos(angle));
            const y = Math.round(cy + r * Math.sin(angle));
            setPixel(image, x, y, 0.9 + Math.random() * 0.1);
            setPixel(image, x + 1, y, 0.5);
            setPixel(image, x, y + 1, 0.5);
        }
    };

    const drawLine = (image: number[][], x1: number, y1: number, x2: number, y2: number, width: number) => {
        const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)) * 2;
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = Math.round(x1 + (x2 - x1) * t);
            const y = Math.round(y1 + (y2 - y1) * t);
            for (let dx = -width/2; dx <= width/2; dx++) {
                for (let dy = -width/2; dy <= width/2; dy++) {
                    setPixel(image, x + dx, y + dy, 0.9 + Math.random() * 0.1);
                }
            }
        }
    };

    const drawArc = (image: number[][], cx: number, cy: number, r: number, startAngle: number, endAngle: number) => {
        for (let angle = startAngle; angle <= endAngle; angle += 0.1) {
            const x = Math.round(cx + r * Math.cos(angle));
            const y = Math.round(cy + r * Math.sin(angle));
            setPixel(image, x, y, 0.9 + Math.random() * 0.1);
            setPixel(image, x + 1, y, 0.5);
        }
    };

    const setPixel = (image: number[][], x: number, y: number, value: number) => {
        if (x >= 0 && x < 28 && y >= 0 && y < 28) {
            image[Math.round(y)][Math.round(x)] = Math.max(image[Math.round(y)][Math.round(x)], value);
        }
    };

    const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
        const canvas = canvasRef.current;
        if (!canvas) return { x: 0, y: 0 };

        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        if ('touches' in e) {
            return {
                x: (e.touches[0].clientX - rect.left) * scaleX,
                y: (e.touches[0].clientY - rect.top) * scaleY
            };
        }
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    };

    const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        setIsDrawing(true);
        const { x, y } = getCoordinates(e);
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    };

    const draw = (e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        if (!isDrawing) return;

        const { x, y } = getCoordinates(e);
        const ctx = canvasRef.current?.getContext('2d');
        if (ctx) {
            ctx.lineWidth = 20;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#ffffff';
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }
    };

    const stopDrawing = () => {
        setIsDrawing(false);
        predict();
    };

    const predict = useCallback(async () => {
        const canvas = canvasRef.current;
        if (!canvas || !model) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Get the bounding box of the drawn content
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const { minX, minY, maxX, maxY } = getBoundingBox(imageData);

        if (minX === Infinity) {
            // No drawing detected
            return;
        }

        // Create a temporary canvas for processing
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 28;
        tempCanvas.height = 28;
        const tempCtx = tempCanvas.getContext('2d');
        if (!tempCtx) return;

        // Fill with black
        tempCtx.fillStyle = '#000000';
        tempCtx.fillRect(0, 0, 28, 28);

        // Calculate the size of the drawn area
        const drawWidth = maxX - minX;
        const drawHeight = maxY - minY;
        const size = Math.max(drawWidth, drawHeight);

        // Add padding (20 pixels on each side in the 28x28 space = ~3 pixels)
        const padding = 4;
        const scale = (28 - padding * 2) / size;

        // Center the digit
        const offsetX = (28 - drawWidth * scale) / 2 - minX * scale;
        const offsetY = (28 - drawHeight * scale) / 2 - minY * scale;

        // Draw the centered and scaled digit
        tempCtx.drawImage(
            canvas,
            minX, minY, drawWidth, drawHeight,
            padding + (28 - padding * 2 - drawWidth * scale) / 2,
            padding + (28 - padding * 2 - drawHeight * scale) / 2,
            drawWidth * scale,
            drawHeight * scale
        );

        const processedImageData = tempCtx.getImageData(0, 0, 28, 28);

        // Convert to tensor with proper normalization
        const tensor = tf.tidy(() => {
            const values: number[] = [];
            for (let i = 0; i < processedImageData.data.length; i += 4) {
                // Use red channel and normalize
                values.push(processedImageData.data[i] / 255);
            }
            return tf.tensor4d(values, [1, 28, 28, 1]);
        });

        // Make prediction
        const prediction = model.predict(tensor) as tf.Tensor;
        const probabilities = await prediction.data();

        // Create predictions array
        const preds: Prediction[] = Array.from(probabilities).map((conf, digit) => ({
            digit,
            confidence: conf * 100
        })).sort((a, b) => b.confidence - a.confidence);

        setPredictions(preds);
        setTopPrediction(preds[0]);

        // Cleanup
        tensor.dispose();
        prediction.dispose();
    }, [model]);

    // Get bounding box of non-black pixels
    const getBoundingBox = (imageData: ImageData) => {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        const { width, height, data } = imageData;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const idx = (y * width + x) * 4;
                // Check if pixel is not black (has some white)
                if (data[idx] > 10) {
                    minX = Math.min(minX, x);
                    minY = Math.min(minY, y);
                    maxX = Math.max(maxX, x);
                    maxY = Math.max(maxY, y);
                }
            }
        }

        return { minX, minY, maxX: maxX + 1, maxY: maxY + 1 };
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        setPredictions([]);
        setTopPrediction(null);
    };

    return (
        <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Canvas Section */}
                <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        Draw a digit (0-9)
                    </h4>
                    <div className="relative">
                        <canvas
                            ref={canvasRef}
                            width={280}
                            height={280}
                            className="w-full max-w-[280px] aspect-square rounded-xl cursor-crosshair touch-none border-2 border-slate-300 dark:border-slate-600"
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            onTouchStart={startDrawing}
                            onTouchMove={draw}
                            onTouchEnd={stopDrawing}
                        />
                        {isLoading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-xl">
                                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mb-2"></div>
                                <div className="text-white text-sm">Training model...</div>
                                <div className="text-white/60 text-xs mt-1">This may take a few seconds</div>
                            </div>
                        )}
                        {loadError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-red-900/70 rounded-xl">
                                <div className="text-white text-sm text-center px-4">{loadError}</div>
                            </div>
                        )}
                    </div>
                    <motion.button
                        onClick={clearCanvas}
                        disabled={isLoading}
                        className="mt-4 px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors disabled:opacity-50"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Clear
                    </motion.button>
                </div>

                {/* Predictions Section */}
                <div className="flex-1">
                    <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                        Prediction
                    </h4>

                    {topPrediction && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-center mb-6"
                        >
                            <div className="text-7xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">
                                {topPrediction.digit}
                            </div>
                            <div className="text-sm text-slate-500 dark:text-slate-400">
                                {topPrediction.confidence.toFixed(1)}% confidence
                            </div>
                        </motion.div>
                    )}

                    {/* Confidence bars */}
                    <div className="space-y-2">
                        {predictions.slice(0, 5).map((pred, index) => (
                            <motion.div
                                key={pred.digit}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center gap-3"
                            >
                                <span className="w-4 text-sm font-mono text-slate-600 dark:text-slate-400">
                                    {pred.digit}
                                </span>
                                <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${pred.confidence}%` }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </div>
                                <span className="w-12 text-xs text-right text-slate-500 dark:text-slate-400">
                                    {pred.confidence.toFixed(1)}%
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {!topPrediction && !isLoading && (
                        <p className="text-slate-500 dark:text-slate-400 text-sm">
                            Draw a digit on the canvas to see predictions
                        </p>
                    )}
                </div>
            </div>

            <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">
                * This CNN model is trained in your browser using TensorFlow.js on synthetic digit patterns.
                Draw digits clearly in the center for best results.
            </p>
        </div>
    );
};
