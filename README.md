# Sorting Algorithm Visualizer

A modern, interactive web application for visualizing and comparing sorting algorithms side by side. Built with Next.js, TypeScript, and Tailwind CSS.

> **Note**: This repository is part of the blog post ["What a Comeback: Google Firebase Studio Strikes Back This Time, Lovable Still Performs Flawlessly"](https://medium.com/@wjleon/what-a-comeback-google-firebase-studio-strikes-back-this-time-lovable-still-performs-flawlessly-cc9aafabaf6c) on Medium.

## 🎯 Features

- **Side-by-Side Comparison**: Compare two different sorting algorithms simultaneously
- **Real-time Visualization**: Watch elements being compared, swapped, and sorted with color-coded animations
- **Audio Feedback**: Optional sound effects that represent the values being compared
- **Multiple Algorithms**: Choose from 22 different sorting algorithms
- **Customizable Settings**:
  - Adjust the number of elements (10-200)
  - Control animation speed
  - Choose different initial array distributions
- **Interactive Controls**: Start, pause, and reset the visualization at any time
- **Performance Metrics**: Track comparisons and time elapsed for each algorithm

## 🚀 Technologies Used

- **Next.js 13.5** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **shadcn/ui** - Beautiful UI components
- **React Hooks** - Custom hooks for sorting logic
- **Web Audio API** - Sound generation

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sorting-algorithm-visualizer.git
cd sorting-algorithm-visualizer
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎮 How to Use

1. **Select Algorithms**: Choose two different sorting algorithms from the dropdown menus
2. **Configure Settings**:
   - Set the number of elements to sort (10-200)
   - Choose the initial distribution of elements:
     - Random
     - Sorted (ascending)
     - Sorted (descending)
     - Two ascending halves
     - Two descending halves
3. **Adjust Speed**: Use the speed slider to control animation speed
4. **Toggle Sound**: Enable/disable audio feedback
5. **Start Visualization**: Click "Start" to begin the sorting process
6. **Control Playback**: Use Pause/Resume and Reset buttons as needed

## 🔧 Available Sorting Algorithms

### Elementary Sorts
- **Bubble Sort** - Simple comparison-based algorithm
- **Selection Sort** - Finds minimum and places it at the beginning
- **Insertion Sort** - Builds sorted array one element at a time

### Efficient Sorts
- **Merge Sort** - Divide-and-conquer algorithm
- **Quick Sort** - Efficient divide-and-conquer algorithm
- **Heap Sort** - Uses a binary heap data structure

### Distribution Sorts
- **Counting Sort** - Non-comparison integer sorting
- **Radix Sort** - Sorts by individual digits
- **Bucket Sort** - Distributes elements into buckets

### Other Algorithms
- **Shell Sort** - Generalization of insertion sort
- **Tim Sort** - Hybrid stable sorting algorithm
- **Comb Sort** - Improvement over bubble sort
- **Pigeonhole Sort** - Suitable for small range of values
- **Cycle Sort** - In-place sorting algorithm
- **Strand Sort** - Recursive sorting algorithm
- **Bitonic Sort** - Comparison-based sorting network
- **Pancake Sort** - Sorting by prefix reversals
- **Bogo Sort** - Inefficient random sorting
- **Gnome Sort** - Similar to insertion sort
- **Stooge Sort** - Recursive sorting algorithm
- **Odd-Even Sort** - Variation of bubble sort

## 🎨 Visual Indicators

- **Blue**: Default state
- **Yellow**: Elements being compared
- **Red**: Elements being swapped
- **Green**: Sorted elements

## 🛠️ Development

### Project Structure
```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── SortingVisualizer.tsx
│   ├── AlgorithmPanel.tsx
│   ├── ControlPanel.tsx
│   └── ui/               # UI components
├── hooks/                # Custom React hooks
│   └── useSorting.ts
├── lib/                  # Utility functions
│   ├── sortingAlgorithms.ts
│   ├── arrayGenerator.ts
│   └── utils.ts
└── types/               # TypeScript type definitions
```

### Building for Production
```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

Made with ❤️ by Bolt 