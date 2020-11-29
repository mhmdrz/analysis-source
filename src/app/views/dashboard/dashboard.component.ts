import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user/user';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { TopArtistsService } from '../../services/top-artists/top-artists.service';
import { TopTracksService } from '../../services/top-tracks/top-tracks.service';
import {
  map,
  concatAll,
  concatMap,
  share,
  toArray,
  mergeMap,
} from 'rxjs/operators';
import { TrackFeatureService } from '../../services/track-feature/track-feature.service';
import { TracksAndFeatures } from '../../models/tracks-and-features/tracks-and-features';
import { TopArtist } from 'src/app/models/top-artists/top-artist';
import { RecommendationsService } from '../../services/recommendations/recommendations.service';
import { Genres } from './genres';
import Chart from 'chart.js';
import { RecommendationTracks } from 'src/app/models/recommendation/recommendation-tracks';
import { PlaylistItems } from 'src/app/models/playlist/playlist-items';
import { PlaylistService } from '../../services/playlist/playlist.service';
declare var Granim: any;
import gsap from 'gsap';
import { SnackService } from 'src/app/services/snack/snack.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  userResult: User = new User('', '', '', '', '', []);
  topArtistsLT: TopArtist[] = [];
  topArtistsLTLoading: boolean = false;
  isNavDropOpen: boolean = false;
  tracksAndFeaturesLoading: boolean = false;
  tracksAndFeatures: TracksAndFeatures[] = [];
  topGenres: {
    name: string;
    count: number;
  }[];
  private commonGenres: string[] = Genres;
  private userValence: number;
  moodResult: RecommendationTracks[] = [];
  secondMoodResult: RecommendationTracks[] = [];
  userLoading: boolean = false;
  private genreSeeds: string = '';
  private trackSeeds: string = '';
  moodLoading: boolean = false;
  playlistResult: PlaylistItems[] = [];
  playlistsLoading: boolean = false;
  secondPlaylistResult: PlaylistItems[] = [];
  private granimInstence: any;
  private backColors = {
    defColors: [
      ['#F5F7FA', '#B8C6DB'],
      ['#6782B4', '#B1BFD8'],
      ['#28313B', '#485461'],
    ],
    happyColors: [
      ['#ffafbd', '#ffc3a0'],
      ['#cc2b5e', '#753a88'],
      ['#2193b0', '#6dd5ed'],
      ['#de6262', '#ffb88c'],
      ['#4568dc', '#b06ab3'],
    ],
    sadColors: [
      ['#bdc3c7', '#2c3e50'],
      ['#000428', '#004e92'],
      ['#28313B', '#485461'],
      ['#04619F', '#2e3338'],
      ['#2C3E50', '#2e3338'],
    ],
  };

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private topArtistsService: TopArtistsService,
    private topTracksService: TopTracksService,
    private trackFeatureService: TrackFeatureService,
    private recommendationService: RecommendationsService,
    private playlistService: PlaylistService,
    private router: Router,
    private snackService: SnackService
  ) {}

  ngOnInit(): void {
    this.backgroundAnim();
    this.initAnim();
    this.getTopArtistsLongTerm();
    this.getData();
  }

  private backgroundAnim() {
    this.granimInstence = new Granim({
      element: '#a-back-canvas',
      direction: 'left-right',
      isPausedWhenNotInView: true,
      states: {
        'default-state': {
          gradients: this.backColors.defColors,
        },
        happy: {
          gradients: this.backColors.happyColors,
        },
        sad: {
          gradients: this.backColors.sadColors,
        },
      },
    });
  }

  private initAnim() {
    gsap.to('.a-navbar-icon, .a-navbar-title', 1.5, {
      opacity: 1,
      onComplete: () => {
        const logoTl = gsap.timeline({
          repeat: -1,
          repeatDelay: 10,
        });
        logoTl.to('.a-navbar-icon', 3, {
          rotate: 360,
          ease: 'bounce.out',
        });
      },
    });
    gsap.to('.a-nav-drop-btn', 1, {
      opacity: 1,
      delay: 1,
    });
    gsap.to('.a-col-title span', 2, {
      translateY: 0,
      ease: 'expo.out',
      delay: 1,
    });
  }

  private getTopArtistsLongTerm() {
    this.topArtistsLTLoading = true;
    const topArtists = this.topArtistsService.getTopArtistsLongTerm();
    topArtists.subscribe(
      (res) => {
        this.topArtistsLT = res.items.slice(0, 5);
        this.topArtistsLTLoading = false;
        setTimeout(() => {
          for (let i = 0; i < this.topArtistsLT.length; i++) {
            gsap
              .fromTo(
                '.a-item-' + i,
                0.5,
                {
                  right: -100,
                  opacity: 0,
                },
                {
                  right: 0,
                  opacity: 1,
                }
              )
              .delay(i * 0.1);
          }
        }, 500);
        const genres = res.items
          .map((item) =>
            item.genres.map((commonGenre) =>
              this.commonGenres.find((genre) => commonGenre.includes(genre))
            )
          )
          .reduce((a, b) => a.concat(b));
        this.topGenres = this.commonGenres
          .map((x) => {
            const obj = {
              name: x,
              count: genres.filter((top) => top === x).length,
            };
            return obj;
          })
          .filter((f) => f.count != 0);
        this.topGenres = this.topGenres.sort((x, y) => y.count - x.count);
        this.genreSeeds = this.topGenres
          .map((x) => x.name)
          .slice(0, 2)
          .join(',');

        const cnvs = document.getElementById('genreChart');
        const genreChart = new Chart(cnvs, {
          type: 'radar',
          data: {
            labels: this.topGenres
              .map((c) => c.name.charAt(0).toUpperCase() + c.name.slice(1))
              .slice(0, 6),
            datasets: [
              {
                labels: 'Genres',
                data: this.topGenres.map((c) => c.count).slice(0, 6),
                backgroundColor: 'rgba(29, 185, 84, 0.4)',
                borderColor: '#15843c',
                borderSize: 5,
                pointBackgroundColor: '#65e792',
                pointWidth: 4,
                pointRadius: 4,
              },
            ],
          },
          options: {
            animation: {
              duration: 1500,
              easing: 'easeOutExpo',
            },
            scale: {
              pointLabels: {
                fontSize: '16',
                fontColor: '#fff',
                fontFamily: "'Poppins', 'sans-serif'",
              },
              gridLines: {
                color: '#262626',
              },
              ticks: {
                display: false,
              },
            },
            legend: {
              display: false,
            },
            tooltips: {
              enabled: false,
            },
          },
        });
        this.chartResponsiveFunc(genreChart);
        gsap.fromTo(
          '.a-chart-container',
          1,
          {
            opacity: 0,
          },
          {
            opacity: 1,
          }
        );
      },
      (error) => {
        console.log(error);
        this.snackService.setTooltip(error);
        this.topArtistsLTLoading = false;
      }
    );
  }

  private chartResponsiveFunc(genreChart: any) {
    if (window.screen.width < 576) {
      genreChart.options.scale.pointLabels = {
        fontSize: '10',
        fontColor: '#fff',
        fontFamily: "'Poppins', 'sans-serif'",
      };
      genreChart.update();
    }
  }

  private getData() {
    this.tracksAndFeaturesLoading = true;
    this.userLoading = true;
    this.moodLoading = true;
    this.playlistsLoading = true;

    const data = this.userService.getUser().pipe(share());

    data.subscribe(
      (res) => {
        this.userResult = res;
        this.userLoading = false;
      },
      (error) => {
        console.log(error);
        this.snackService.setTooltip(error);
        this.userLoading = false;
      }
    );

    const trackAndFeature = data.pipe(
      mergeMap(() =>
        this.topTracksService.getTopTracksShortTerm().pipe(
          map((res) => res.items),
          concatAll(),
          concatMap((item) =>
            this.trackFeatureService
              .getTrackFeatures(item.id)
              .pipe(map((features) => new TracksAndFeatures(item, features)))
          ),
          toArray(),
          share()
        )
      )
    );

    trackAndFeature.subscribe(
      (res) => {
        this.tracksAndFeaturesLoading = false;
        this.tracksAndFeatures = res.slice(0, 5);
        setTimeout(() => {
          for (let i = 0; i < this.tracksAndFeatures.length; i++) {
            gsap
              .fromTo(
                '.a-track-item-' + i,
                0.5,
                {
                  right: -100,
                  opacity: 0,
                },
                {
                  right: 0,
                  opacity: 1,
                }
              )
              .delay(i * 0.1);
          }
        }, 500);
        this.trackSeeds = res
          .map((item) => item.track.id)
          .slice(0, 2)
          .join(',');
        const tmp = res.map((item) => item.track.popularity);
        const minPopularity = Math.min.apply(Math, tmp);
        const maxPopularity = Math.max.apply(Math, tmp);
        const weights = res.map(
          (item) => (item.track.popularity - minPopularity) / maxPopularity
        );
        this.userValence =
          weights
            .map((value, index) => value * res[index].features.valence)
            .reduce((p, c) => p + c) / weights.reduce((p, c) => p + c);
        const valence = Math.ceil(this.userValence);
        if (valence >= 5) {
          this.granimInstence.changeState('happy');
        } else {
          this.granimInstence.changeState('sad');
        }
      },
      (error) => {
        console.log(error);
        this.snackService.setTooltip(error);
        this.tracksAndFeaturesLoading = false;
      }
    );

    const topArtists = trackAndFeature.pipe(
      concatMap(() => this.topArtistsService.getTopArtistsShortTerm()),
      share()
    );

    topArtists
      .pipe(
        map((res) =>
          res.items
            .map((item) => item.id)
            .slice(0, 1)
            .join(',')
        ),
        concatMap((artists) =>
          this.recommendationService.getMoodRecommend(
            this.userResult.country,
            this.userValence,
            artists,
            this.genreSeeds,
            this.trackSeeds
          )
        )
      )
      .subscribe(
        (res) => {
          this.moodResult = res.tracks.filter((item, index) => index <= 4);
          this.secondMoodResult = res.tracks.filter(
            (item, index) => index >= 5
          );
          setTimeout(() => {
            for (let i = 0; i < this.moodResult.length; i++) {
              gsap
                .fromTo(
                  '.a-mood-item-' + i,
                  0.5,
                  {
                    right: -100,
                    opacity: 0,
                  },
                  {
                    right: 0,
                    opacity: 1,
                  }
                )
                .delay(i * 0.1);
            }
            for (let i = 0; i < this.secondMoodResult.length; i++) {
              gsap
                .fromTo(
                  '.a-second-mood-item-' + i,
                  0.5,
                  {
                    right: -100,
                    opacity: 0,
                  },
                  {
                    right: 0,
                    opacity: 1,
                  }
                )
                .delay(i * 0.1);
            }
          }, 500);
          this.moodLoading = false;
        },
        (error) => {
          console.log(error);
          this.snackService.setTooltip(error);
          this.moodLoading = false;
        }
      );

    const playlists = data.pipe(
      mergeMap((item) =>
        this.playlistService.getFeaturedPlaylists(item.country)
      )
    );

    playlists.subscribe(
      (res) => {
        this.playlistResult = res.playlists.items.filter(
          (item, index) => index <= 4
        );
        this.secondPlaylistResult = res.playlists.items.filter(
          (item, index) => index >= 5
        );
        setTimeout(() => {
          for (let i = 0; i < this.playlistResult.length; i++) {
            gsap
              .fromTo(
                '.a-playlist-item-' + i,
                0.5,
                {
                  right: -100,
                  opacity: 0,
                },
                {
                  right: 0,
                  opacity: 1,
                }
              )
              .delay(i * 0.1);
          }
          for (let i = 0; i < this.secondPlaylistResult.length; i++) {
            gsap
              .fromTo(
                '.a-second-playlist-item-' + i,
                0.5,
                {
                  right: -100,
                  opacity: 0,
                },
                {
                  right: 0,
                  opacity: 1,
                }
              )
              .delay(i * 0.1);
          }
        }, 500);
        this.playlistsLoading = false;
      },
      (error) => {
        console.log(error);
        this.snackService.setTooltip(error);
        this.playlistsLoading = false;
      }
    );
  }

  logoutBtnClicked() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
